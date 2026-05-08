package com.recouvrex.process.chatbot.service;

import com.recouvrex.process.chatbot.model.ChatSession;
import com.recouvrex.process.chatbot.model.ChatSessionStatus;
import com.recouvrex.process.chatbot.repository.ChatSessionRepository;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatSessionService {

    private final ChatSessionRepository chatSessionRepository;
    private final EmailService emailService;

    @Value("${app.chatbot.base-url}")
    private String baseUrl;

    @Transactional
    public ChatSession createAndSendChatSession(Case case1) {
        // Vérifier si une session ACTIVE existe déjà pour ce dossier
        boolean alreadyActive = chatSessionRepository
            .findByCase1AndStatus(case1, ChatSessionStatus.ACTIVE)
            .isPresent();

        if (alreadyActive) {
            log.info("Session chatbot déjà active pour le dossier {}", case1.getCaseId());
            return null;
        }

        // Générer token unique + PIN à 6 chiffres
        String token = UUID.randomUUID().toString();
        String pinCode = String.format("%06d", (int)(Math.random() * 1000000));

        ChatSession session = ChatSession.builder()
            .case1(case1)
            .token(token)
            .pinCode(pinCode)
            .agent(case1.getAssignedAgent())
            .status(ChatSessionStatus.ACTIVE)
            .build();

        chatSessionRepository.save(session);

        // Construire le lien
        String chatLink = baseUrl + "/chat/negociation?token=" + token;

        // Envoyer l'email au client
        String clientEmail = case1.getThirdParty().getBusinessEmail() != null
            ? case1.getThirdParty().getBusinessEmail()
            : case1.getThirdParty().getPersonalEmail();

        if (clientEmail != null) {
            try {
                String subject = "Recouvrex - Regularisez votre situation amiablement";
                String body = buildEmailBody(
                    case1.getThirdParty().getFirstName(),
                    case1.getThirdParty().getLastName(),
                    case1.getTotalAmount() != null ? case1.getTotalAmount().toString() : "?",
                    chatLink,
                    pinCode
                );
                emailService.sendEmail(clientEmail, subject, body);
                log.info("Email chatbot envoye a {} pour dossier {}",
                    clientEmail, case1.getCaseId());
            } catch (Exception e) {
                log.error("Erreur envoi email chatbot pour dossier {}: {}",
                    case1.getCaseId(), e.getMessage());
            }
        } else {
            log.warn("Pas d email pour le client du dossier {}", case1.getCaseId());
        }

        return session;
    }

    private String buildEmailBody(String prenom, String nom,
                                   String montant, String lien, String pin) {
        return String.format("""
            Bonjour %s %s,

            Nous vous contactons au sujet de votre dossier de recouvrement.
            Un montant de %s MAD est actuellement en attente de regularisation.

            Afin de faciliter le reglement de votre situation, nous vous proposons
            de discuter directement avec notre conseiller virtuel disponible 24h/24.

            Cliquez sur le lien ci-dessous pour acceder a votre espace de negociation :
            %s

            Votre code d acces confidentiel : %s

            Ce lien est valable 7 jours. Merci de ne pas le partager.

            Cordialement,
            L equipe Recouvrex
            """, prenom, nom, montant, lien, pin);
    }
}