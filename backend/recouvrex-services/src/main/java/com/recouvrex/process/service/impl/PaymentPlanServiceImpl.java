package com.recouvrex.process.service.impl;

import com.recouvrex.process.dto.CreatePaymentPlanDTO;
import com.recouvrex.process.dto.InstallmentDTO;
import com.recouvrex.process.dto.PaymentPlanResponseDTO;
import com.recouvrex.process.dto.UpdatePaymentPlanDTO;
import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.model.enums.AgreementTypesEnum;
import com.recouvrex.process.model.enums.PaymentStatusEnum;

import com.recouvrex.process.model.enums.ValidationActionEnum;
import com.recouvrex.process.repository.*;
import com.recouvrex.process.service.PaymentPlanService;
import com.recouvrex.process.service.PdfGeneratorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PaymentPlanServiceImpl implements PaymentPlanService {

    private final AgreementRepository agreementRepository;
    private final InstallmentPaymentRepository installmentPaymentRepository;
    private final AgreementValidationRepository validationRepository;
    private final CaseRepository caseRepository;
    private final UserRepository userRepository;
    private final PaymentPlanTemplateRepository templateRepository;
    private final PdfGeneratorService pdfGeneratorService;

    // ✅ Statuts de dossier qui bloquent la création/relance d'un plan de paiement
    private static final List<String> BLOCKED_STATUSES = List.of(
        "Radié",
        "Terminé",
        "Saisie conservation immobilière initiée"
    );

    @Override
    public PaymentPlanResponseDTO createPaymentPlan(CreatePaymentPlanDTO dto, Long initiatorId) {
        log.info("Creating payment plan for case {} by user {}", dto.getCaseId(), initiatorId);

        // 1. Récupérer le cas
        Case case1 = caseRepository.findById(dto.getCaseId())
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + dto.getCaseId()));

        // ✅ Vérifier que le statut du dossier autorise la création d'un plan
        String caseStatus = case1.getStatus().getStatus();
        if (BLOCKED_STATUSES.contains(caseStatus)) {
            throw new IllegalArgumentException(
                "Impossible de créer un plan de paiement pour un dossier avec le statut : " + caseStatus
            );
        }

        // 2. Récupérer l'initiateur
        User initiator = userRepository.findById(initiatorId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + initiatorId));

        // 3. Calculer les montants
        BigDecimal totalAmount = dto.getTotalAmount();
        BigDecimal interestRate = dto.getInterestRate() != null ? dto.getInterestRate() : BigDecimal.ZERO;
        BigDecimal interestAmount = totalAmount.multiply(interestRate)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal totalWithInterest = totalAmount.add(interestAmount);
        BigDecimal monthlyPayment = totalWithInterest
                .divide(BigDecimal.valueOf(dto.getNumberOfInstallments()), 2, RoundingMode.HALF_UP);

        // 4. Créer l'Agreement
        Agreement agreement = Agreement.builder()
                .agreementId("AGR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .agreementDate(LocalDate.now())
                .agreementStatus(AgreementStatusTypesEnum.EN_COURS)
                .agreementType(AgreementTypesEnum.REGLEMENT_ECHELONNE)
                .agreementStartDate(dto.getFirstPaymentDate())
                .agreementValidityDate(dto.getFirstPaymentDate().plusMonths(dto.getNumberOfInstallments()))
                .initiator(initiator)
                .case1(case1)
                .agreementDescription(dto.getDescription())
                .monthlyPaymentAmount(monthlyPayment)
                .totalAmountWithInterest(totalWithInterest)
                .interestAmount(interestAmount)
                .build();

        if (dto.getTemplateId() != null) {
            PaymentPlanTemplate template = templateRepository.findById(dto.getTemplateId())
                    .orElseThrow(() -> new RuntimeException("Template not found"));
            agreement.setTemplate(template);
        }

        agreement = agreementRepository.save(agreement);

        // 5. Créer les échéances
        List<InstallmentPayment> installments = buildInstallments(agreement, dto.getFirstPaymentDate(),
                dto.getNumberOfInstallments(), monthlyPayment, totalWithInterest);
        installmentPaymentRepository.saveAll(installments);

        // 6. Enregistrer l'action de création
        AgreementValidation validation = AgreementValidation.builder()
                .agreement(agreement)
                .user(initiator)
                .action(ValidationActionEnum.SUBMITTED)
                .comment("Plan de paiement créé")
                .actionDate(LocalDateTime.now())
                .build();
        validationRepository.save(validation);

        log.info("Payment plan created successfully with ID: {}", agreement.getId());
        return mapToResponseDTO(agreement, installments);
    }

    // ✅ Modifier un plan (Agent, statut EN_COURS uniquement)
    @Override
    public PaymentPlanResponseDTO updatePaymentPlan(Long agreementId, UpdatePaymentPlanDTO dto) {
        log.info("Updating payment plan {}", agreementId);

        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found with id: " + agreementId));

        // Vérifier que le plan est encore EN_COURS (pas encore validé)
        if (agreement.getAgreementStatus() != AgreementStatusTypesEnum.EN_COURS) {
            throw new IllegalStateException(
                "Impossible de modifier un plan avec le statut : " + agreement.getAgreementStatus()
                + ". Seuls les plans EN_COURS peuvent être modifiés."
            );
        }

        // Recalculer les montants
        BigDecimal totalAmount = agreement.getCase1().getTotalAmount();
        BigDecimal interestRate = dto.getInterestRate() != null ? dto.getInterestRate() : BigDecimal.ZERO;
        BigDecimal interestAmount = totalAmount.multiply(interestRate)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal totalWithInterest = totalAmount.add(interestAmount);
        BigDecimal monthlyPayment = totalWithInterest
                .divide(BigDecimal.valueOf(dto.getNumberOfInstallments()), 2, RoundingMode.HALF_UP);

        // Mettre à jour l'accord
        agreement.setInterestAmount(interestAmount);
        agreement.setTotalAmountWithInterest(totalWithInterest);
        agreement.setMonthlyPaymentAmount(monthlyPayment);
        agreement.setAgreementValidityDate(
            agreement.getAgreementStartDate().plusMonths(dto.getNumberOfInstallments())
        );
        if (dto.getDescription() != null) {
            agreement.setAgreementDescription(dto.getDescription());
        }
        agreementRepository.save(agreement);

        // Supprimer les anciennes échéances et recréer
        installmentPaymentRepository.deleteByAgreementId(agreementId);
        List<InstallmentPayment> installments = buildInstallments(agreement,
                agreement.getAgreementStartDate(), dto.getNumberOfInstallments(),
                monthlyPayment, totalWithInterest);
        installmentPaymentRepository.saveAll(installments);

        log.info("Payment plan {} updated successfully", agreementId);
        return mapToResponseDTO(agreement, installments);
    }

    // ✅ Supprimer un plan (Agent, statut EN_COURS ou REJETE uniquement)
    @Override
    public void deletePaymentPlan(Long agreementId) {
        log.info("Deleting payment plan {}", agreementId);

        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found with id: " + agreementId));

        AgreementStatusTypesEnum status = agreement.getAgreementStatus();
        if (status != AgreementStatusTypesEnum.EN_COURS && status != AgreementStatusTypesEnum.REJETE) {
            throw new IllegalStateException(
                "Impossible de supprimer un plan avec le statut : " + status
                + ". Seuls les plans EN_COURS ou REJETE peuvent être supprimés."
            );
        }

        // Supprimer les échéances, validations, puis l'accord
        installmentPaymentRepository.deleteByAgreementId(agreementId);
        validationRepository.deleteByAgreementId(agreementId);
        agreementRepository.delete(agreement);

        log.info("Payment plan {} deleted successfully", agreementId);
    }

    @Override
    public PaymentPlanResponseDTO getPaymentPlanById(Long agreementId) {
        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found with id: " + agreementId));
        List<InstallmentPayment> installments = installmentPaymentRepository
                .findByAgreementIdOrderByInstallmentNumber(agreementId);
        return mapToResponseDTO(agreement, installments);
    }

    @Override
    public List<PaymentPlanResponseDTO> getPaymentPlansByCase(Long caseId) {
        List<Agreement> agreements = agreementRepository.findByCase1Id(caseId);
        return agreements.stream()
                .map(agreement -> {
                    List<InstallmentPayment> installments = installmentPaymentRepository
                            .findByAgreementIdOrderByInstallmentNumber(agreement.getId());
                    return mapToResponseDTO(agreement, installments);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<PaymentPlanResponseDTO> getPendingPaymentPlans(Long managerId) {
        List<Agreement> agreements = agreementRepository.findPendingAgreementsByManager(managerId);
        return agreements.stream()
                .map(agreement -> {
                    List<InstallmentPayment> installments = installmentPaymentRepository
                            .findByAgreementIdOrderByInstallmentNumber(agreement.getId());
                    return mapToResponseDTO(agreement, installments);
                })
                .collect(Collectors.toList());
    }

    @Override
    public PaymentPlanResponseDTO validatePaymentPlan(Long agreementId, Long validatorId, String comment) {
        log.info("Validating payment plan {} by user {}", agreementId, validatorId);

        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found"));
        User validator = userRepository.findById(validatorId)
                .orElseThrow(() -> new RuntimeException("Validator not found"));

        agreement.setAgreementStatus(AgreementStatusTypesEnum.ACCEPTE);
        agreement.setValidator(validator);
        agreement.setValidatedAt(LocalDateTime.now());
        agreementRepository.save(agreement);

        AgreementValidation validation = AgreementValidation.builder()
                .agreement(agreement)
                .user(validator)
                .action(ValidationActionEnum.APPROVED)
                .comment(comment != null ? comment : "Plan validé")
                .actionDate(LocalDateTime.now())
                .build();
        validationRepository.save(validation);

        List<InstallmentPayment> installments = installmentPaymentRepository
                .findByAgreementIdOrderByInstallmentNumber(agreementId);
        return mapToResponseDTO(agreement, installments);
    }

    @Override
    public PaymentPlanResponseDTO rejectPaymentPlan(Long agreementId, Long validatorId, String reason) {
        log.info("Rejecting payment plan {} by user {}", agreementId, validatorId);

        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found"));
        User validator = userRepository.findById(validatorId)
                .orElseThrow(() -> new RuntimeException("Validator not found"));

        agreement.setAgreementStatus(AgreementStatusTypesEnum.REJETE);
        agreement.setValidator(validator);
        agreement.setRejectionReason(reason);
        agreementRepository.save(agreement);

        AgreementValidation validation = AgreementValidation.builder()
                .agreement(agreement)
                .user(validator)
                .action(ValidationActionEnum.REJECTED)
                .comment(reason)
                .actionDate(LocalDateTime.now())
                .build();
        validationRepository.save(validation);

        List<InstallmentPayment> installments = installmentPaymentRepository
                .findByAgreementIdOrderByInstallmentNumber(agreementId);
        return mapToResponseDTO(agreement, installments);
    }

    @Override
    public void cancelPaymentPlan(Long agreementId, Long userId, String reason) {
        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        agreement.setAgreementStatus(AgreementStatusTypesEnum.ANNULE);
        agreementRepository.save(agreement);

        AgreementValidation validation = AgreementValidation.builder()
                .agreement(agreement)
                .user(user)
                .action(ValidationActionEnum.CANCELLED)
                .comment(reason)
                .actionDate(LocalDateTime.now())
                .build();
        validationRepository.save(validation);
    }

    @Override
    public String generatePaymentPlanPdf(Long agreementId) {
        try {
            Agreement agreement = agreementRepository.findById(agreementId)
                    .orElseThrow(() -> new RuntimeException("Agreement not found"));
            String pdfPath = pdfGeneratorService.generatePaymentPlanPdf(agreement);
            agreement.setPdfFilePath(pdfPath);
            agreementRepository.save(agreement);
            return pdfPath;
        } catch (Exception e) {
            log.error("Error generating PDF", e);
            throw new RuntimeException("Erreur lors de la génération du PDF", e);
        }
    }

    @Override
    public void recordInstallmentPayment(Long installmentId, Long reglementId) {
        InstallmentPayment installment = installmentPaymentRepository.findById(installmentId)
                .orElseThrow(() -> new RuntimeException("Installment not found"));

        installment.setStatus(PaymentStatusEnum.REGLE);
        installment.setPaidDate(LocalDate.now());
        installment.setPaidAmount(installment.getAmount());
        installmentPaymentRepository.save(installment);

        List<InstallmentPayment> allInstallments = installmentPaymentRepository
                .findByAgreementIdOrderByInstallmentNumber(installment.getAgreement().getId());
        boolean allPaid = allInstallments.stream()
                .allMatch(i -> i.getStatus() == PaymentStatusEnum.REGLE);
        if (allPaid) {
            Agreement agreement = installment.getAgreement();
            agreement.setAgreementStatus(AgreementStatusTypesEnum.TERMINE);
            agreement.setCompletedAt(LocalDateTime.now());
            agreementRepository.save(agreement);
        }
    }

    @Override
    public void sendInstallmentReminders() {
        LocalDate reminderDate = LocalDate.now().plusDays(3);
        List<InstallmentPayment> installments = installmentPaymentRepository
                .findInstallmentsNeedingReminder(reminderDate);
        for (InstallmentPayment installment : installments) {
            log.info("Sending reminder for installment {}", installment.getId());
            installment.setReminderSent(true);
            installment.setReminderSentAt(LocalDateTime.now());
        }
        installmentPaymentRepository.saveAll(installments);
    }

    @Override
    public AgreementStatusTypesEnum getPaymentPlanStatus(Long agreementId) {
        Agreement agreement = agreementRepository.findById(agreementId)
                .orElseThrow(() -> new RuntimeException("Agreement not found"));
        return agreement.getAgreementStatus();
    }

    @Override
    public List<InstallmentDTO> getUpcomingInstallments(Long userId, int daysAhead) {
        LocalDate today = LocalDate.now();
        LocalDate limitDate = today.plusDays(daysAhead);
        List<InstallmentPayment> installments = installmentPaymentRepository
                .findUpcomingInstallmentsByUser(userId, today, limitDate);
        return installments.stream()
                .map(i -> InstallmentDTO.builder()
                        .id(i.getId())
                        .installmentNumber(i.getInstallmentNumber())
                        .dueDate(i.getDueDate())
                        .amount(i.getAmount())
                        .paidAmount(i.getPaidAmount())
                        .status(i.getStatus())
                        .paidDate(i.getPaidDate())
                        .reminderSent(i.getReminderSent())
                        .agreementCode(i.getAgreement().getAgreementId())
                        .build())
                .collect(Collectors.toList());
    }

    // ========== MÉTHODES UTILITAIRES ==========

    private List<InstallmentPayment> buildInstallments(Agreement agreement, LocalDate firstPaymentDate,
            int numberOfInstallments, BigDecimal monthlyPayment, BigDecimal totalWithInterest) {
        List<InstallmentPayment> installments = new ArrayList<>();
        LocalDate currentDueDate = firstPaymentDate;
        for (int i = 1; i <= numberOfInstallments; i++) {
            BigDecimal installmentAmount = monthlyPayment;
            if (i == numberOfInstallments) {
                BigDecimal sumPrevious = monthlyPayment.multiply(BigDecimal.valueOf(i - 1));
                installmentAmount = totalWithInterest.subtract(sumPrevious);
            }
            InstallmentPayment installment = InstallmentPayment.builder()
                    .agreement(agreement)
                    .installmentNumber(i)
                    .dueDate(currentDueDate)
                    .amount(installmentAmount)
                    .paidAmount(BigDecimal.ZERO)
                    .status(PaymentStatusEnum.EN_ATTENTE)
                    .reminderSent(false)
                    .build();
            installments.add(installment);
            currentDueDate = currentDueDate.plusMonths(1);
        }
        return installments;
    }

    private PaymentPlanResponseDTO mapToResponseDTO(Agreement agreement, List<InstallmentPayment> installments) {
        List<InstallmentDTO> installmentDTOs = installments.stream()
                .map(i -> InstallmentDTO.builder()
                        .id(i.getId())
                        .installmentNumber(i.getInstallmentNumber())
                        .dueDate(i.getDueDate())
                        .amount(i.getAmount())
                        .paidAmount(i.getPaidAmount())
                        .status(i.getStatus())
                        .paidDate(i.getPaidDate())
                        .reminderSent(i.getReminderSent())
                        .build())
                .collect(Collectors.toList());

        return PaymentPlanResponseDTO.builder()
                .agreementId(agreement.getId())
                .agreementCode(agreement.getAgreementId())
                .agreementDate(agreement.getAgreementDate())
                .status(agreement.getAgreementStatus())
                .totalAmount(agreement.getCase1().getTotalAmount())
                .monthlyPaymentAmount(agreement.getMonthlyPaymentAmount())
                .interestAmount(agreement.getInterestAmount())
                .totalAmountWithInterest(agreement.getTotalAmountWithInterest())
                .numberOfInstallments(installments.size())
                .firstPaymentDate(agreement.getAgreementStartDate())
                .initiatorName(agreement.getInitiator().getFirstName() + " " + agreement.getInitiator().getLastName())
                .validatorName(agreement.getValidator() != null ?
                        agreement.getValidator().getFirstName() + " " + agreement.getValidator().getLastName() : null)
                .pdfFilePath(agreement.getPdfFilePath())
                .installments(installmentDTOs)
                .build();
    }
}
