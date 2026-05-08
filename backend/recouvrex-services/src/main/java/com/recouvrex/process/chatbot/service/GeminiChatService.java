package com.recouvrex.process.chatbot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.recouvrex.process.chatbot.model.ConversationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiChatService {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.api-url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public String generateReply(
            String clientNom,
            String clientPrenom,
            String montantDu,
            List<ConversationMessage> history,
            String newMessage
    ) {
        // Construire l'historique pour Gemini
        List<Map<String, Object>> contents = new ArrayList<>();

        // System prompt comme premier message user/model
        contents.add(Map.of(
            "role", "user",
            "parts", List.of(Map.of("text", buildSystemPrompt(clientNom, clientPrenom, montantDu)))
        ));
        contents.add(Map.of(
            "role", "model",
            "parts", List.of(Map.of("text", "Bien compris. Je suis prêt à aider " + clientPrenom + " " + clientNom + "."))
        ));

        // Historique de la conversation
        for (ConversationMessage msg : history) {
            String role = switch (msg.getSender()) {
                case CLIENT -> "user";
                case AI, AGENT -> "model";
            };
            contents.add(Map.of(
                "role", role,
                "parts", List.of(Map.of("text", msg.getMessage()))
            ));
        }

        // Nouveau message client
        contents.add(Map.of(
            "role", "user",
            "parts", List.of(Map.of("text", newMessage))
        ));

        Map<String, Object> body = Map.of(
            "contents", contents,
            "generationConfig", Map.of(
                "temperature", 0.5,
                "maxOutputTokens", 512
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        String urlWithKey = apiUrl + "?key=" + apiKey;

        try {
            ResponseEntity<JsonNode> response = restTemplate.exchange(
                urlWithKey, HttpMethod.POST, entity, JsonNode.class
            );

            String text = response.getBody()
                .path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText();

            return text.strip();

        } catch (Exception e) {
            log.error("Erreur GeminiChat", e);
            return "Je suis désolé, je rencontre une difficulté technique. Veuillez réessayer dans quelques instants.";
        }
    }

    public String generateSummary(
            String clientNom,
            String clientPrenom,
            List<ConversationMessage> history
    ) {
        StringBuilder conversation = new StringBuilder();
        for (ConversationMessage msg : history) {
            String role = switch (msg.getSender()) {
                case CLIENT -> clientPrenom + " " + clientNom;
                case AI -> "Agent virtuel";
                case AGENT -> "Agent humain";
            };
            conversation.append(role).append(": ").append(msg.getMessage()).append("\n");
        }

        String prompt = String.format("""
            Voici la conversation de négociation avec le client %s %s :
            
            %s
            
            Génère un résumé professionnel en français de cette conversation en 3-5 phrases.
            Inclus : le ton général du client, les points discutés, et l'issue de la négociation.
            Réponds uniquement avec le résumé, sans titre ni formatage.
            """, clientPrenom, clientNom, conversation);

        List<Map<String, Object>> contents = List.of(
            Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))
        );

        Map<String, Object> body = Map.of(
            "contents", contents,
            "generationConfig", Map.of("temperature", 0.3, "maxOutputTokens", 512)
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<JsonNode> response = restTemplate.exchange(
                apiUrl + "?key=" + apiKey, HttpMethod.POST, entity, JsonNode.class
            );
            return response.getBody()
                .path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText().strip();
        } catch (Exception e) {
            log.error("Erreur génération résumé", e);
            return "Résumé indisponible.";
        }
    }

    private String buildSystemPrompt(String nom, String prenom, String montant) {
        return String.format("""
            Tu es un agent de recouvrement virtuel professionnel et empathique de la société Recouvrex.
            Tu t'adresses au client %s %s qui a une dette de %s MAD.
            
            Ton rôle :
            - Négocier le remboursement de la dette de manière respectueuse
            - Proposer des plans de paiement adaptés si le client ne peut pas payer en une fois
            - Répondre aux questions du client sur sa situation
            - Rester professionnel et bienveillant en toutes circonstances
            - Répondre uniquement en français
            - Ne jamais menacer ou intimider le client
            
            Tu ne dois jamais sortir de ce rôle.
            """, prenom, nom, montant);
    }
}