package com.recouvrex.process.service;

import com.recouvrex.process.chatbot.service.ChatSessionService;
import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.model.enums.ReminderChannelEnum;
import com.recouvrex.process.model.enums.ReminderStatusEnum;
import com.recouvrex.process.repository.CreditRepository;
import com.recouvrex.process.repository.InstallmentPaymentRepository;
import com.recouvrex.process.repository.ReminderHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class ReminderService {

    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private InstallmentPaymentRepository installmentPaymentRepository;

    @Autowired
    private ReminderHistoryRepository reminderHistoryRepository;

    @Autowired
    private ChatSessionService chatSessionService;

    @Value("${chatbot.trigger.overdue-days:30}")
    private int overdueThresholdDays;

    // ✅ Statuts de dossier qui bloquent l'envoi de relances
    private static final List<String> BLOCKED_STATUSES = List.of(
        "Radié",
        "Terminé",
        "Saisie conservation immobilière initiée"
    );

    public void sendOverdueReminders() {
        List<Credit> creditsEnRetard = creditRepository.findCreditsEnRetard();

        for (Credit credit : creditsEnRetard) {
            LocalDate nextInstallmentDate = credit.getFirstInstallmentDate()
                    .plusMonths(credit.getTriggeredInstallmentNumber() + 1);

            if (LocalDate.now().isAfter(nextInstallmentDate)) {
                emailService.sendEmail(
                    credit.getThirdParty().getBusinessEmail(),
                    "Relance de paiement",
                    "Bonjour " + credit.getThirdParty().getFirstName() + ",\n\n" +
                    "Vous avez un paiement en retard de " + credit.getUnpaidAmount() + " MAD.\n\n" +
                    "Merci de regulariser votre situation.\n\nCordialement,\nRecouvrex"
                );
                credit.setReminderSent(true);
                creditRepository.save(credit);
            }
        }
    }

    public void sendInstallmentReminders() {
        LocalDate today = LocalDate.now();
        LocalDate limitDate = today.plusDays(7);

        log.info("Recherche echeances entre {} et {}", today, limitDate);
        List<InstallmentPayment> upcoming = installmentPaymentRepository
                .findUpcomingInstallmentsForReminder(today, limitDate);

        log.info("{} echeances trouvees", upcoming.size());

        for (InstallmentPayment installment : upcoming) {

            // ✅ Vérifier que le plan est validé (ACCEPTE) — pas de relance si encore en attente
            AgreementStatusTypesEnum planStatus = installment.getAgreement().getAgreementStatus();
            if (planStatus != AgreementStatusTypesEnum.ACCEPTE) {
                log.info("Plan non validé (statut: {}), relance ignorée pour échéance {}",
                    planStatus, installment.getId());
                continue;
            }

            // ✅ Vérifier que le dossier n'est pas dans un statut bloquant
            String caseStatus = installment.getAgreement().getCase1().getStatus().getStatus();
            if (BLOCKED_STATUSES.contains(caseStatus)) {
                log.info("Dossier inactif (statut: {}), relance ignorée pour échéance {}",
                    caseStatus, installment.getId());
                continue;
            }

            ThirdParty client = installment.getAgreement().getCase1().getThirdParty();

            boolean emailSent = false;
            boolean smsSent = false;

            // ── Email ──
            String email = client.getBusinessEmail() != null
                    ? client.getBusinessEmail()
                    : client.getPersonalEmail();

            String subject = "Rappel : Echeance de paiement n " + installment.getInstallmentNumber();
            String body = "Bonjour " + client.getFirstName() + " " + client.getLastName() + ",\n\n" +
                    "Nous vous rappelons que votre echeance n " + installment.getInstallmentNumber() +
                    " d un montant de " + installment.getAmount() + " MAD" +
                    " est due le " + installment.getDueDate() + ".\n\n" +
                    "Accord : " + installment.getAgreement().getAgreementId() + "\n\n" +
                    "Merci de regulariser votre situation.\n\n" +
                    "Cordialement,\nL equipe Recouvrex";

            if (email != null) {
                try {
                    emailService.sendEmail(email, subject, body);
                    emailSent = true;
                    saveHistory(installment, ReminderChannelEnum.EMAIL,
                        ReminderStatusEnum.SUCCESS, email, null);
                    log.info("Email envoye a {}", email);
                } catch (Exception e) {
                    saveHistory(installment, ReminderChannelEnum.EMAIL,
                        ReminderStatusEnum.FAILED, email, e.getMessage());
                    log.error("Erreur email pour {}: {}", email, e.getMessage());
                }
            }

            // ── SMS ──
            String phone = client.getPrivatePhone() != null
                    ? client.getPrivatePhone()
                    : client.getBusinessPhone();

            String smsBody = "Bonjour " + client.getFirstName() + ", votre echeance n " +
                    installment.getInstallmentNumber() + " de " + installment.getAmount() +
                    " MAD est due le " + installment.getDueDate() +
                    ". Accord: " + installment.getAgreement().getAgreementId() +
                    ". Merci. - Recouvrex";

            if (phone != null) {
                try {
                    smsService.sendSms(phone, smsBody);
                    smsSent = true;
                    saveHistory(installment, ReminderChannelEnum.SMS,
                        ReminderStatusEnum.SUCCESS, phone, null);
                    log.info("SMS envoye a {}", phone);
                } catch (Exception e) {
                    saveHistory(installment, ReminderChannelEnum.SMS,
                        ReminderStatusEnum.FAILED, phone, e.getMessage());
                    log.error("Erreur SMS pour {}: {}", phone, e.getMessage());
                }
            }

            // ── Marquer si au moins un canal a réussi ──
            if (emailSent || smsSent) {
                installment.setReminderSent(true);
                installment.setReminderSentAt(LocalDateTime.now());
                installmentPaymentRepository.save(installment);
                log.info("Rappel marque pour echeance n {}", installment.getInstallmentNumber());
            }
        }
    }

    // ── Job séparé pour déclencher le chatbot ──
    public void triggerChatbotForOverdue() {
        LocalDate limitDate = LocalDate.now().minusDays(overdueThresholdDays);

        log.info("Recherche echeances en retard de plus de {} jours (avant {})",
            overdueThresholdDays, limitDate);

        List<InstallmentPayment> overdueInstallments = installmentPaymentRepository
            .findOverdueInstallmentsForChatbot(limitDate);

        log.info("{} echeances en retard trouvees pour chatbot", overdueInstallments.size());

        for (InstallmentPayment installment : overdueInstallments) {
            Case case1 = installment.getAgreement().getCase1();
            try {
                chatSessionService.createAndSendChatSession(case1);
            } catch (Exception e) {
                log.error("Erreur creation session chatbot pour dossier {}: {}",
                    case1.getCaseId(), e.getMessage());
            }
        }
    }

    private void saveHistory(InstallmentPayment installment, ReminderChannelEnum channel,
                              ReminderStatusEnum status, String recipient, String errorMessage) {
        ReminderHistory history = ReminderHistory.builder()
                .installment(installment)
                .channel(channel)
                .status(status)
                .sentAt(LocalDateTime.now())
                .recipient(recipient)
                .errorMessage(errorMessage)
                .build();
        reminderHistoryRepository.save(history);
    }
}
