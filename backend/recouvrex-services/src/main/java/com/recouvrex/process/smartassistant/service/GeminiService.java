package com.recouvrex.process.smartassistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recouvrex.process.smartassistant.dto.SmartAssistantRequest;
import com.recouvrex.process.smartassistant.dto.SmartAssistantResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.api-url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public SmartAssistantResponse analyzeCase(SmartAssistantRequest request) {
        String prompt = buildPrompt(request);

        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            ),
            "generationConfig", Map.of(
                "temperature", 0.3,
                "maxOutputTokens", 4096  // augmenté pour éviter la troncature
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

            String jsonText = response.getBody()
                .path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText();

            // Nettoyer backticks markdown
            jsonText = jsonText.strip();
            if (jsonText.startsWith("```")) {
                jsonText = jsonText.replaceAll("^```(?:json)?\\s*", "")
                                   .replaceAll("```\\s*$", "")
                                   .strip();
            }

            // Fix encodage : forcer UTF-8
            jsonText = new String(jsonText.getBytes(java.nio.charset.StandardCharsets.ISO_8859_1),
                                  java.nio.charset.StandardCharsets.UTF_8);

            return objectMapper.readValue(jsonText, SmartAssistantResponse.class);

        } catch (Exception e) {
            log.error("Erreur appel Gemini API", e);
            return buildFallbackResponse();
        }
    }

    private String buildPrompt(SmartAssistantRequest r) {
        return String.format("""
            Tu es un expert en recouvrement de creances. Analyse ce dossier et reponds UNIQUEMENT avec du JSON brut valide, sans backticks, sans markdown, sans texte avant ou apres.

            Donnees du dossier :
            - Client : %s %s
            - Montant du : %.2f MAD
            - Retard : %d jours
            - Versements effectues : %d / Manques : %d
            - Relances email : %d / SMS : %d
            - Dossier contentieux : %s %s

            Reponds avec ce format JSON exact :
            {
              "niveauRisque": "FAIBLE" ou "MOYEN" ou "ELEVE",
              "resume": "resume court de la situation en 2 phrases",
              "actions": [
                {
                  "titre": "titre court de l action",
                  "priorite": "HAUTE" ou "MOYENNE" ou "BASSE",
                  "description": "explication concrete de l action a faire"
                }
              ]
            }

            Propose entre 2 et 4 actions concretes et pertinentes. Reponds en francais sans accents ni caracteres speciaux.
            """,
            r.getClientPrenom(), r.getClientNom(),
            r.getMontantDu(),
            r.getJoursRetard(),
            r.getNombreVersements(), r.getNombreVersementsManques(),
            r.getNombreRelancesEmail(), r.getNombreRelancesSms(),
            r.isDossierContentieux() ? "Oui" : "Non",
            r.isDossierContentieux() ? "— Statut : " + r.getStatutContentieux() : ""
        );
    }

    private SmartAssistantResponse buildFallbackResponse() {
        SmartAssistantResponse fallback = new SmartAssistantResponse();
        fallback.setNiveauRisque("MOYEN");
        fallback.setResume("Analyse indisponible momentanement. Veuillez reessayer.");
        fallback.setActions(List.of());
        return fallback;
    }
}