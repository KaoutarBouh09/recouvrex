package com.recouvrex.process.chatbot.service;

import com.recouvrex.process.chatbot.dto.ChatMessageRequest;
import com.recouvrex.process.chatbot.dto.ChatMessageResponse;
import com.recouvrex.process.chatbot.dto.ConversationDTO;
import com.recouvrex.process.chatbot.model.*;
import com.recouvrex.process.chatbot.repository.*;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatSessionRepository chatSessionRepository;
    private final ConversationMessageRepository conversationMessageRepository;
    private final GeminiChatService geminiChatService;
    private final EmailService emailService;

    private static final DateTimeFormatter FORMATTER =
        DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    // ── Créer une session depuis ReminderService ──
    @Transactional
    public ChatSession createSession(Case case1) {
        String token = UUID.randomUUID().toString();
        String pinCode = String.format("%06d", (int)(Math.random() * 1000000));

        ChatSession session = ChatSession.builder()
            .case1(case1)
            .token(token)
            .pinCode(pinCode)
            .agent(case1.getAssignedAgent())
            .status(ChatSessionStatus.ACTIVE)
            .build();

        return chatSessionRepository.save(session);
    }

    // ── Valider token + PIN ──
    public ChatSession validateAccess(String token, String pinCode) {
        ChatSession session = chatSessionRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if (session.getStatus() == ChatSessionStatus.EXPIRED ||
            session.getExpiresAt().isBefore(java.time.LocalDateTime.now())) {
            session.setStatus(ChatSessionStatus.EXPIRED);
            chatSessionRepository.save(session);
            throw new RuntimeException("Session expirée");
        }

        if (!session.getPinCode().equals(pinCode)) {
            throw new RuntimeException("Code PIN incorrect");
        }

        return session;
    }

    // ── Envoyer un message client et obtenir réponse AI ──
    @Transactional
    public ChatMessageResponse sendMessage(ChatMessageRequest request) {
        ChatSession session = validateAccess(request.getToken(), request.getPinCode());

        Case case1 = session.getCase1();
        String montant = case1.getTotalAmount() != null
            ? case1.getTotalAmount().toString() : "inconnu";

        ConversationMessage clientMsg = ConversationMessage.builder()
            .session(session)
            .sender(MessageSender.CLIENT)
            .message(request.getMessage())
            .build();
        conversationMessageRepository.save(clientMsg);

        List<ConversationMessage> history =
            conversationMessageRepository.findBySessionOrderByTimestampAsc(session);

        String aiReply = geminiChatService.generateReply(
            case1.getThirdParty().getLastName(),
            case1.getThirdParty().getFirstName(),
            montant,
            history,
            request.getMessage()
        );

        ConversationMessage aiMsg = ConversationMessage.builder()
            .session(session)
            .sender(MessageSender.AI)
            .message(aiReply)
            .build();
        conversationMessageRepository.save(aiMsg);

        ChatMessageResponse response = new ChatMessageResponse();
        response.setSender("AI");
        response.setMessage(aiReply);
        response.setTimestamp(java.time.LocalDateTime.now().format(FORMATTER));
        return response;
    }

    // ── Clôturer la session + résumé + email agent ──
    @Transactional
    public void closeSession(String token, String pinCode) {
        ChatSession session = validateAccess(token, pinCode);
        Case case1 = session.getCase1();

        List<ConversationMessage> history =
            conversationMessageRepository.findBySessionOrderByTimestampAsc(session);

        String summary = geminiChatService.generateSummary(
            case1.getThirdParty().getLastName(),
            case1.getThirdParty().getFirstName(),
            history
        );

        session.setSummary(summary);
        session.setStatus(ChatSessionStatus.CLOSED);
        session.setClosedAt(java.time.LocalDateTime.now());
        chatSessionRepository.save(session);

        if (session.getAgent() != null && session.getAgent().getEmail() != null) {
            String subject = "Conversation terminée — Dossier " + case1.getCaseId();
            String body = "Bonjour,\n\n" +
                "La conversation avec le client " +
                case1.getThirdParty().getFirstName() + " " +
                case1.getThirdParty().getLastName() +
                " (Dossier : " + case1.getCaseId() + ") est terminée.\n\n" +
                "Résumé :\n" + summary + "\n\n" +
                "Consultez l'interface Recouvrex pour voir la conversation complète et télécharger le PDF.\n\n" +
                "Cordialement,\nRecouvrex";
            emailService.sendEmail(session.getAgent().getEmail(), subject, body);
        }
    }

    // ── Récupérer toutes les conversations pour l'agent ──
    public List<ConversationDTO> getAllConversations(Long userId) {
          List<ChatSession> sessions;

        if (userId != null) {
               sessions = chatSessionRepository.findByAgentId(userId);
        } else {
               sessions = chatSessionRepository.findAll();
       }

        return sessions.stream().map(session -> {
             ConversationDTO dto = new ConversationDTO();
             dto.setSessionId(session.getId());
             dto.setCaseId(session.getCase1().getCaseId());
             dto.setClientNom(session.getCase1().getThirdParty().getLastName());
             dto.setClientPrenom(session.getCase1().getThirdParty().getFirstName());
             dto.setStatus(session.getStatus().name());
             dto.setCreatedAt(session.getCreatedAt().format(FORMATTER));

             List<ChatMessageResponse> messages =
                  conversationMessageRepository
                      .findBySessionOrderByTimestampAsc(session)
                      .stream().map(msg -> {
                            ChatMessageResponse r = new ChatMessageResponse();
                            r.setSender(msg.getSender().name());
                            r.setMessage(msg.getMessage());
                            r.setTimestamp(msg.getTimestamp().format(FORMATTER));
                            return r;
                     }).collect(Collectors.toList());

             dto.setMessages(messages);
             return dto;
          }).collect(Collectors.toList());
    }
    // ── Récupérer une conversation par sessionId ──
    public ConversationDTO getConversation(Long sessionId) {
        ChatSession session = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session introuvable"));

        ConversationDTO dto = new ConversationDTO();
        dto.setSessionId(session.getId());
        dto.setCaseId(session.getCase1().getCaseId());
        dto.setClientNom(session.getCase1().getThirdParty().getLastName());
        dto.setClientPrenom(session.getCase1().getThirdParty().getFirstName());
        dto.setStatus(session.getStatus().name());
        dto.setCreatedAt(session.getCreatedAt().format(FORMATTER));

        List<ChatMessageResponse> messages =
            conversationMessageRepository
                .findBySessionOrderByTimestampAsc(session)
                .stream().map(msg -> {
                    ChatMessageResponse r = new ChatMessageResponse();
                    r.setSender(msg.getSender().name());
                    r.setMessage(msg.getMessage());
                    r.setTimestamp(msg.getTimestamp().format(FORMATTER));
                    return r;
                }).collect(Collectors.toList());

        dto.setMessages(messages);
        return dto;
    }

    // ── Intervention agent ──
    @Transactional
    public ChatMessageResponse agentIntervene(Long sessionId, String message) {
        ChatSession session = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if (session.getStatus() == ChatSessionStatus.ACTIVE) {
            session.setStatus(ChatSessionStatus.AGENT_TOOK_OVER);
            chatSessionRepository.save(session);
        }

        ConversationMessage agentMsg = ConversationMessage.builder()
            .session(session)
            .sender(MessageSender.AGENT)
            .message(message)
            .build();
        conversationMessageRepository.save(agentMsg);

        ChatMessageResponse response = new ChatMessageResponse();
        response.setSender("AGENT");
        response.setMessage(message);
        response.setTimestamp(java.time.LocalDateTime.now().format(FORMATTER));
        return response;
    }

    // ── Récupérer tous les messages d'une session (polling client) ──
    public List<ChatMessageResponse> getMessages(String token, String pinCode) {
        ChatSession session = validateAccess(token, pinCode);

        return conversationMessageRepository
            .findBySessionOrderByTimestampAsc(session)
            .stream().map(msg -> {
                ChatMessageResponse r = new ChatMessageResponse();
                r.setSender(msg.getSender().name());
                r.setMessage(msg.getMessage());
                r.setTimestamp(msg.getTimestamp().format(FORMATTER));
                return r;
            }).collect(Collectors.toList());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ── Générer PDF de la conversation (multi-page + accents complets) ──
    // ─────────────────────────────────────────────────────────────────────────
    public byte[] generateConversationPdf(Long sessionId) throws Exception {

        ChatSession session = chatSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session introuvable"));

        List<ConversationMessage> messages =
            conversationMessageRepository.findBySessionOrderByTimestampAsc(session);

        Case case1 = session.getCase1();
        String clientNom = case1.getThirdParty().getFirstName()
            + " " + case1.getThirdParty().getLastName();

        try (PDDocument document = new PDDocument()) {

            // ── Charger les polices TTF depuis src/main/resources/fonts/ ──
            PDType0Font fontRegular, fontBold;
            try (InputStream r = new ClassPathResource("fonts/LiberationSans-Regular.ttf").getInputStream();
                 InputStream b = new ClassPathResource("fonts/LiberationSans-Bold.ttf").getInputStream()) {
                fontRegular = PDType0Font.load(document, r);
                fontBold    = PDType0Font.load(document, b);
            }

            final float margin       = 50;
            final float pageHeight   = PDRectangle.A4.getHeight();
            final float pageWidth    = PDRectangle.A4.getWidth();
            final float contentWidth = pageWidth - 2 * margin;
            final float bottomLimit  = margin + 20;

            // ── État mutable de la page courante ──
            PDPage[]              currentPage    = { null };
            PDPageContentStream[] cs             = { null };
            float[]               y              = { 0 };

            // Ouvre une nouvelle page A4
            Runnable newPage = () -> {
                try {
                    if (cs[0] != null) cs[0].close();
                    currentPage[0] = new PDPage(PDRectangle.A4);
                    document.addPage(currentPage[0]);
                    cs[0] = new PDPageContentStream(document, currentPage[0]);
                    y[0] = pageHeight - margin;
                } catch (Exception e) { throw new RuntimeException(e); }
            };

            // Écrit une ligne — crée une nouvelle page si nécessaire
            WriteLine writeLine = (font, size, x, text) -> {
                try {
                    if (y[0] < bottomLimit) newPage.run();
                    cs[0].beginText();
                    cs[0].setFont(font, size);
                    cs[0].newLineAtOffset(x, y[0]);
                    cs[0].showText(sanitize(text));
                    cs[0].endText();
                    y[0] -= size * 1.5f;
                } catch (Exception e) { throw new RuntimeException(e); }
            };

            // Trait horizontal séparateur
            Runnable separator = () -> {
                try {
                    if (y[0] < bottomLimit) newPage.run();
                    cs[0].setLineWidth(0.5f);
                    cs[0].moveTo(margin, y[0]);
                    cs[0].lineTo(pageWidth - margin, y[0]);
                    cs[0].stroke();
                    y[0] -= 14;
                } catch (Exception e) { throw new RuntimeException(e); }
            };

            // ── Page 1 ──
            newPage.run();

            // Titre
            writeLine.write(fontBold, 15, margin,
                "RAPPORT DE CONVERSATION  —  Dossier " + case1.getCaseId());
            y[0] -= 4;

            // Infos client
            writeLine.write(fontRegular, 10, margin,
                "Client : " + clientNom
                + "     Date : " + session.getCreatedAt().format(FORMATTER)
                + "     Statut : " + session.getStatus().name());
            y[0] -= 6;
            separator.run();

            // Résumé
            if (session.getSummary() != null && !session.getSummary().isBlank()) {
                writeLine.write(fontBold, 11, margin, "Résumé :");
                y[0] -= 2;
                for (String line : splitLines(session.getSummary(), fontRegular, 10, contentWidth)) {
                    writeLine.write(fontRegular, 10, margin + 8, line);
                }
                y[0] -= 8;
                separator.run();
            }

            // Titre conversation
            writeLine.write(fontBold, 11, margin, "Conversation :");
            y[0] -= 4;

            // Messages
            for (ConversationMessage msg : messages) {
                String sender = switch (msg.getSender()) {
                    case CLIENT -> "Client";
                    case AI     -> "Agent virtuel (IA)";
                    case AGENT  -> "Agent";
                };

                // En-tête [heure] Expéditeur :
                writeLine.write(fontBold, 10, margin,
                    "[" + msg.getTimestamp().format(FORMATTER) + "]  " + sender + " :");

                // Corps du message, découpé selon la largeur réelle
                List<String> lines = splitLines(msg.getMessage(), fontRegular, 10, contentWidth - 16);
                for (String line : lines) {
                    writeLine.write(fontRegular, 10, margin + 14, line);
                }
                y[0] -= 5;
            }

            // Fermer le dernier stream
            if (cs[0] != null) cs[0].close();

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return out.toByteArray();
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ── Interfaces fonctionnelles internes ──
    // ─────────────────────────────────────────────────────────────────────────

    @FunctionalInterface
    private interface WriteLine {
        void write(PDType0Font font, float size, float x, String text);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ── Helpers ──
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Supprime uniquement \n \r \t — les accents sont conservés grâce à PDType0Font.
     */
    private String sanitize(String text) {
        if (text == null) return "";
        return text.replaceAll("[\\r\\n\\t]", " ").trim();
    }

    /**
     * Découpe le texte en lignes tenant dans maxWidth px,
     * en mesurant la largeur réelle avec la police TTF.
     */
    private List<String> splitLines(String text, PDType0Font font,
                                    float fontSize, float maxWidth) {
        List<String> result = new ArrayList<>();
        if (text == null || text.isBlank()) return result;

        for (String paragraph : text.replaceAll("\\r\\n", "\n").split("\\n")) {
            if (paragraph.isBlank()) { result.add(""); continue; }

            String[] words = paragraph.split(" ");
            StringBuilder current = new StringBuilder();

            for (String word : words) {
                if (word.isEmpty()) continue;
                String candidate = current.isEmpty() ? word : current + " " + word;
                try {
                    float w = font.getStringWidth(sanitize(candidate)) / 1000f * fontSize;
                    if (w > maxWidth && !current.isEmpty()) {
                        result.add(current.toString());
                        current = new StringBuilder(word);
                    } else {
                        current = new StringBuilder(candidate);
                    }
                } catch (Exception e) {
                    current = new StringBuilder(sanitize(candidate));
                }
            }
            if (!current.isEmpty()) result.add(current.toString());
        }
        return result;
    }
}
