package com.recouvrex.process.chatbot.service;

import com.recouvrex.process.chatbot.model.ChatSession;
import com.recouvrex.process.chatbot.model.ChatSessionStatus;
import com.recouvrex.process.chatbot.repository.ChatSessionRepository;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.model.User;
import com.recouvrex.process.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests ChatSessionService")
class ChatSessionServiceTest {

    @Mock private ChatSessionRepository chatSessionRepository;
    @Mock private EmailService emailService;

    @InjectMocks
    private ChatSessionService chatSessionService;

    private Case testCase;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(chatSessionService, "baseUrl", "http://recouvrex.local");

        User agent = new User();
        agent.setId(1L);
        agent.setFirstName("Kaoutar");
        agent.setLastName("Bouh");

        ThirdParty client = new ThirdParty();
        client.setFirstName("Youssef");
        client.setLastName("Alaoui");
        client.setBusinessEmail("youssef@test.com");

        testCase = new Case();
        testCase.setCaseId("CASE-001");
        testCase.setThirdParty(client);
        testCase.setAssignedAgent(agent);
        testCase.setTotalAmount(new BigDecimal("8500.00"));
    }

    // =====================================================================
    // TEST 1 — Création réussie d'une session + email envoyé
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - doit créer une session et envoyer un email")
    void createAndSendChatSession_shouldCreateSessionAndSendEmail() {
        // GIVEN — pas de session active existante
        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // WHEN
        ChatSession result = chatSessionService.createAndSendChatSession(testCase);

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getStatus()).isEqualTo(ChatSessionStatus.ACTIVE);
        assertThat(result.getToken()).isNotBlank();
        assertThat(result.getPinCode()).hasSize(6);
        assertThat(result.getCase1()).isEqualTo(testCase);

        verify(chatSessionRepository).save(any(ChatSession.class));
        verify(emailService).sendEmail(eq("youssef@test.com"), anyString(), anyString());
    }

    // =====================================================================
    // TEST 2 — Session déjà active → null retourné, pas de doublon
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - doit retourner null si session déjà active")
    void createAndSendChatSession_shouldReturnNullWhenSessionAlreadyActive() {
        // GIVEN — session active déjà présente
        ChatSession existing = new ChatSession();
        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.of(existing));

        // WHEN
        ChatSession result = chatSessionService.createAndSendChatSession(testCase);

        // THEN
        assertThat(result).isNull();
        verify(chatSessionRepository, never()).save(any());
        verify(emailService, never()).sendEmail(any(), any(), any());
    }

    // =====================================================================
    // TEST 3 — Lien chatbot contient le token et le baseUrl
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - le lien email doit contenir le token et baseUrl")
    void createAndSendChatSession_emailShouldContainTokenAndBaseUrl() {
        // GIVEN
        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // WHEN
        ChatSession result = chatSessionService.createAndSendChatSession(testCase);

        // THEN — capturer le body de l'email
        ArgumentCaptor<String> bodyCaptor = ArgumentCaptor.forClass(String.class);
        verify(emailService).sendEmail(anyString(), anyString(), bodyCaptor.capture());

        String emailBody = bodyCaptor.getValue();
        assertThat(emailBody).contains("http://recouvrex.local/chat/negociation?token=");
        assertThat(emailBody).contains(result.getToken());
        assertThat(emailBody).contains(result.getPinCode());
    }

    // =====================================================================
    // TEST 4 — Email de secours (personalEmail) si businessEmail absent
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - doit utiliser l'email personnel si businessEmail absent")
    void createAndSendChatSession_shouldFallbackToPersonalEmail() {
        // GIVEN — pas de businessEmail
        testCase.getThirdParty().setBusinessEmail(null);
        testCase.getThirdParty().setPersonalEmail("youssef.perso@test.com");

        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // WHEN
        chatSessionService.createAndSendChatSession(testCase);

        // THEN
        verify(emailService).sendEmail(eq("youssef.perso@test.com"), anyString(), anyString());
    }

    // =====================================================================
    // TEST 5 — Aucun email disponible → session créée mais pas d'envoi
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - doit créer la session même sans email client")
    void createAndSendChatSession_shouldCreateSessionEvenWithoutEmail() {
        // GIVEN — aucun email
        testCase.getThirdParty().setBusinessEmail(null);
        testCase.getThirdParty().setPersonalEmail(null);

        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // WHEN
        ChatSession result = chatSessionService.createAndSendChatSession(testCase);

        // THEN — session créée mais email non envoyé
        assertThat(result).isNotNull();
        verify(emailService, never()).sendEmail(any(), any(), any());
    }

    // =====================================================================
    // TEST 6 — Erreur email → session quand même sauvegardée (pas d'exception)
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - une erreur d'email ne doit pas lever d'exception")
    void createAndSendChatSession_shouldNotThrowOnEmailError() {
        // GIVEN
        when(chatSessionRepository.findByCase1AndStatus(testCase, ChatSessionStatus.ACTIVE))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));
        doThrow(new RuntimeException("SMTP error"))
                .when(emailService).sendEmail(any(), any(), any());

        // WHEN / THEN — pas d'exception levée
        assertThatCode(() -> chatSessionService.createAndSendChatSession(testCase))
                .doesNotThrowAnyException();

        // Session quand même sauvegardée
        verify(chatSessionRepository).save(any(ChatSession.class));
    }

    // =====================================================================
    // TEST 7 — Token et PIN uniques à chaque appel
    // =====================================================================
    @Test
    @DisplayName("createAndSendChatSession - doit générer un token et PIN uniques")
    void createAndSendChatSession_shouldGenerateUniqueTokenAndPin() {
        // GIVEN
        when(chatSessionRepository.findByCase1AndStatus(any(), eq(ChatSessionStatus.ACTIVE)))
                .thenReturn(Optional.empty());
        when(chatSessionRepository.save(any(ChatSession.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Deuxième cas pour le second appel
        Case case2 = new Case();
        case2.setCaseId("CASE-002");
        case2.setThirdParty(testCase.getThirdParty());
        case2.setAssignedAgent(testCase.getAssignedAgent());
        case2.setTotalAmount(new BigDecimal("3000.00"));

        // WHEN
        ChatSession session1 = chatSessionService.createAndSendChatSession(testCase);
        ChatSession session2 = chatSessionService.createAndSendChatSession(case2);

        // THEN — tokens différents
        assertThat(session1.getToken()).isNotEqualTo(session2.getToken());
        assertThat(session1.getPinCode()).matches("\\d{6}");
        assertThat(session2.getPinCode()).matches("\\d{6}");
    }
}
