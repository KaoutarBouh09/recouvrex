package com.recouvrex.process.service;

import com.recouvrex.process.chatbot.service.ChatSessionService;
import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.ReminderChannelEnum;
import com.recouvrex.process.model.enums.ReminderStatusEnum;
import com.recouvrex.process.repository.CreditRepository;
import com.recouvrex.process.repository.InstallmentPaymentRepository;
import com.recouvrex.process.repository.ReminderHistoryRepository;
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
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests ReminderService")
class ReminderServiceTest {

    @Mock private CreditRepository creditRepository;
    @Mock private EmailService emailService;
    @Mock private SmsService smsService;
    @Mock private InstallmentPaymentRepository installmentPaymentRepository;
    @Mock private ReminderHistoryRepository reminderHistoryRepository;
    @Mock private ChatSessionService chatSessionService;

    @InjectMocks
    private ReminderService reminderService;

    private InstallmentPayment buildInstallment(String email, String phone) {
        ThirdParty client = new ThirdParty();
        client.setFirstName("Ahmed");
        client.setLastName("Bennani");
        client.setBusinessEmail(email);
        client.setPrivatePhone(phone);

        Case case1 = new Case();
        case1.setCaseId("CASE-001");

        Agreement agreement = Agreement.builder()
                .agreementId("AGR-ABCD1234")
                .case1(case1)
                .build();
        case1.setThirdParty(client);

        InstallmentPayment installment = InstallmentPayment.builder()
                .installmentNumber(3)
                .dueDate(LocalDate.now().plusDays(5))
                .amount(new BigDecimal("1200.00"))
                .agreement(agreement)
                .reminderSent(false)
                .build();
        installment.setId(1L);

        return installment;
    }

    @BeforeEach
    void setUp() {
        // Injecter la valeur @Value manuellement (non injectable par Mockito)
        ReflectionTestUtils.setField(reminderService, "overdueThresholdDays", 30);
    }

    // =====================================================================
    // TEST 1 — sendInstallmentReminders : email + SMS envoyés avec succès
    // =====================================================================
    @Test
    @DisplayName("sendInstallmentReminders - doit envoyer email et SMS et marquer l'échéance")
    void sendInstallmentReminders_shouldSendEmailAndSmsAndMarkInstallment() {
        // GIVEN
        InstallmentPayment installment = buildInstallment("ahmed@test.com", "+212600000001");

        when(installmentPaymentRepository.findUpcomingInstallmentsForReminder(any(), any()))
                .thenReturn(List.of(installment));

        // WHEN
        reminderService.sendInstallmentReminders();

        // THEN
        verify(emailService).sendEmail(eq("ahmed@test.com"), anyString(), anyString());
        verify(smsService).sendSms(eq("+212600000001"), anyString());
        verify(installmentPaymentRepository).save(installment);
        assertThat(installment.getReminderSent()).isTrue();
    }

    // =====================================================================
    // TEST 2 — sendInstallmentReminders : pas d'échéances → aucun envoi
    // =====================================================================
    @Test
    @DisplayName("sendInstallmentReminders - ne doit rien envoyer si aucune échéance à venir")
    void sendInstallmentReminders_shouldDoNothingWhenNoInstallments() {
        // GIVEN
        when(installmentPaymentRepository.findUpcomingInstallmentsForReminder(any(), any()))
                .thenReturn(List.of());

        // WHEN
        reminderService.sendInstallmentReminders();

        // THEN
        verify(emailService, never()).sendEmail(any(), any(), any());
        verify(smsService, never()).sendSms(any(), any());
        verify(installmentPaymentRepository, never()).save(any());
    }

    // =====================================================================
    // TEST 3 — sendInstallmentReminders : email échoue → historique FAILED
    // =====================================================================
    @Test
    @DisplayName("sendInstallmentReminders - doit enregistrer FAILED si l'email échoue")
    void sendInstallmentReminders_shouldSaveFailedHistoryOnEmailError() {
        // GIVEN
        InstallmentPayment installment = buildInstallment("bad@test.com", null);

        when(installmentPaymentRepository.findUpcomingInstallmentsForReminder(any(), any()))
                .thenReturn(List.of(installment));
        doThrow(new RuntimeException("SMTP error"))
                .when(emailService).sendEmail(any(), any(), any());

        // WHEN
        reminderService.sendInstallmentReminders();

        // THEN — historique FAILED enregistré
        ArgumentCaptor<ReminderHistory> captor = ArgumentCaptor.forClass(ReminderHistory.class);
        verify(reminderHistoryRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(ReminderStatusEnum.FAILED);
        assertThat(captor.getValue().getChannel()).isEqualTo(ReminderChannelEnum.EMAIL);
        assertThat(captor.getValue().getErrorMessage()).contains("SMTP error");

        // L'échéance ne doit PAS être marquée (aucun canal réussi)
        assertThat(installment.getReminderSent()).isFalse();
        verify(installmentPaymentRepository, never()).save(installment);
    }

    // =====================================================================
    // TEST 4 — sendInstallmentReminders : pas d'email → SMS seul suffit
    // =====================================================================
    @Test
    @DisplayName("sendInstallmentReminders - doit marquer l'échéance même si seul le SMS réussit")
    void sendInstallmentReminders_shouldMarkInstallmentWhenOnlySmsSucceeds() {
        // GIVEN — pas d'email, SMS présent
        InstallmentPayment installment = buildInstallment(null, "+212600000002");

        when(installmentPaymentRepository.findUpcomingInstallmentsForReminder(any(), any()))
                .thenReturn(List.of(installment));

        // WHEN
        reminderService.sendInstallmentReminders();

        // THEN
        verify(emailService, never()).sendEmail(any(), any(), any());
        verify(smsService).sendSms(eq("+212600000002"), anyString());
        assertThat(installment.getReminderSent()).isTrue();
        verify(installmentPaymentRepository).save(installment);
    }

    // =====================================================================
    // TEST 5 — sendInstallmentReminders : historique SUCCESS enregistré
    // =====================================================================
    @Test
    @DisplayName("sendInstallmentReminders - doit enregistrer SUCCESS dans l'historique")
    void sendInstallmentReminders_shouldSaveSuccessHistory() {
        // GIVEN
        InstallmentPayment installment = buildInstallment("success@test.com", null);

        when(installmentPaymentRepository.findUpcomingInstallmentsForReminder(any(), any()))
                .thenReturn(List.of(installment));

        // WHEN
        reminderService.sendInstallmentReminders();

        // THEN
        ArgumentCaptor<ReminderHistory> captor = ArgumentCaptor.forClass(ReminderHistory.class);
        verify(reminderHistoryRepository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(ReminderStatusEnum.SUCCESS);
        assertThat(captor.getValue().getChannel()).isEqualTo(ReminderChannelEnum.EMAIL);
        assertThat(captor.getValue().getRecipient()).isEqualTo("success@test.com");
    }

    // =====================================================================
    // TEST 6 — triggerChatbotForOverdue : déclenche chatbot pour chaque dossier
    // =====================================================================
    @Test
    @DisplayName("triggerChatbotForOverdue - doit créer une session chatbot pour chaque dossier en retard")
    void triggerChatbotForOverdue_shouldCreateChatSessionForEachOverdueCase() throws Exception {
        // GIVEN
        Case case1 = new Case(); case1.setCaseId("CASE-001");
        Case case2 = new Case(); case2.setCaseId("CASE-002");

        Agreement agreement1 = Agreement.builder().case1(case1).build();
        Agreement agreement2 = Agreement.builder().case1(case2).build();

        InstallmentPayment overdue1 = InstallmentPayment.builder().agreement(agreement1).build();
        InstallmentPayment overdue2 = InstallmentPayment.builder().agreement(agreement2).build();

        when(installmentPaymentRepository.findOverdueInstallmentsForChatbot(any()))
                .thenReturn(List.of(overdue1, overdue2));

        // WHEN
        reminderService.triggerChatbotForOverdue();

        // THEN
        verify(chatSessionService).createAndSendChatSession(case1);
        verify(chatSessionService).createAndSendChatSession(case2);
    }

    // =====================================================================
    // TEST 7 — triggerChatbotForOverdue : exception chatbot ne bloque pas la boucle
    // =====================================================================
    @Test
    @DisplayName("triggerChatbotForOverdue - une erreur chatbot ne doit pas interrompre les autres dossiers")
    void triggerChatbotForOverdue_shouldContinueOnChatbotError() throws Exception {
        // GIVEN
        Case case1 = new Case(); case1.setCaseId("CASE-ERR");
        Case case2 = new Case(); case2.setCaseId("CASE-OK");

        Agreement agreement1 = Agreement.builder().case1(case1).build();
        Agreement agreement2 = Agreement.builder().case1(case2).build();

        InstallmentPayment overdue1 = InstallmentPayment.builder().agreement(agreement1).build();
        InstallmentPayment overdue2 = InstallmentPayment.builder().agreement(agreement2).build();

        when(installmentPaymentRepository.findOverdueInstallmentsForChatbot(any()))
                .thenReturn(List.of(overdue1, overdue2));
        doThrow(new RuntimeException("Chatbot error"))
                .when(chatSessionService).createAndSendChatSession(case1);

        // WHEN — ne doit pas lever d'exception
        assertThatCode(() -> reminderService.triggerChatbotForOverdue())
                .doesNotThrowAnyException();

        // Le second dossier doit quand même être traité
        verify(chatSessionService).createAndSendChatSession(case2);
    }
}
