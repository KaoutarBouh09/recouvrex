package com.recouvrex.process.smartassistant.service;

import com.recouvrex.process.repository.InstallmentPaymentRepository;
import com.recouvrex.process.repository.ReminderHistoryRepository;
import com.recouvrex.process.model.enums.ReminderChannelEnum;
import com.recouvrex.process.smartassistant.dto.SmartAssistantRequest;
import com.recouvrex.process.repository.CaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class CaseSummaryService {

    private final CaseRepository caseRepository;
    private final InstallmentPaymentRepository installmentPaymentRepository;
    private final ReminderHistoryRepository reminderHistoryRepository;

    public SmartAssistantRequest buildSummary(Long caseId) {

        var caseEntity = caseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Dossier introuvable : " + caseId));

        // Calcul jours de retard depuis startDate
        long joursRetard = 0;
        if (caseEntity.getStartDate() != null) {
            joursRetard = ChronoUnit.DAYS.between(
                caseEntity.getStartDate(), LocalDate.now()
            );
        }

        // Versements depuis InstallmentPayment
        var installments = installmentPaymentRepository.findByAgreementCase1Id(caseId);
        int nombreVersements = installments.size();
        int nombreVersementsManques = (int) installments.stream()
                .filter(i -> "UNPAID".equals(i.getStatus()) || "OVERDUE".equals(i.getStatus()))
                .count();

        // Relances depuis ReminderHistory
        var reminders = reminderHistoryRepository.findByInstallment_Agreement_Case1Id(caseId);
        int nombreRelancesEmail = (int) reminders.stream()
                .filter(r -> ReminderChannelEnum.EMAIL.equals(r.getChannel()))
                .count();
        int nombreRelancesSms = (int) reminders.stream()
                .filter(r -> ReminderChannelEnum.SMS.equals(r.getChannel()))
                .count();

        // Construction de la request
        SmartAssistantRequest request = new SmartAssistantRequest();
        request.setClientNom(caseEntity.getThirdParty().getLastName());
        request.setClientPrenom(caseEntity.getThirdParty().getFirstName());
        request.setMontantDu(caseEntity.getTotalAmount());
        request.setJoursRetard((int) joursRetard);
        request.setNombreVersements(nombreVersements);
        request.setNombreVersementsManques(nombreVersementsManques);
        request.setNombreRelancesEmail(nombreRelancesEmail);
        request.setNombreRelancesSms(nombreRelancesSms);
        request.setDossierContentieux(
            "contentieux".equalsIgnoreCase(caseEntity.getStatus().getStatus())
        );
        request.setStatutContentieux(
            caseEntity.getProcedure() != null
                ? caseEntity.getProcedure().getProcedureLabel()
                : ""
        );

        return request;
    }
}