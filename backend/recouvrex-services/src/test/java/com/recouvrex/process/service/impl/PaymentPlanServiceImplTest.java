package com.recouvrex.process.service.impl;

import com.recouvrex.process.dto.CreatePaymentPlanDTO;
import com.recouvrex.process.dto.InstallmentDTO;
import com.recouvrex.process.dto.PaymentPlanResponseDTO;
import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import com.recouvrex.process.repository.*;
import com.recouvrex.process.service.PdfGeneratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests PaymentPlanService")
class PaymentPlanServiceImplTest {

    @Mock private AgreementRepository agreementRepository;
    @Mock private InstallmentPaymentRepository installmentPaymentRepository;
    @Mock private AgreementValidationRepository validationRepository;
    @Mock private CaseRepository caseRepository;
    @Mock private UserRepository userRepository;
    @Mock private PaymentPlanTemplateRepository templateRepository;
    @Mock private PdfGeneratorService pdfGeneratorService;

    @InjectMocks
    private PaymentPlanServiceImpl paymentPlanService;

    private Case testCase;
    private User testUser;
    private Agreement testAgreement;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFirstName("Kaoutar");
        testUser.setLastName("Bouh");

        testCase = new Case();
        testCase.setId(10L);
        testCase.setTotalAmount(new BigDecimal("5000.00"));

        testAgreement = Agreement.builder()
                .agreementId("AGR-TEST1234")
                .agreementDate(LocalDate.now())
                .agreementStatus(AgreementStatusTypesEnum.EN_COURS)
                .initiator(testUser)
                .case1(testCase)
                .monthlyPaymentAmount(new BigDecimal("500.00"))
                .totalAmountWithInterest(new BigDecimal("5000.00"))
                .interestAmount(BigDecimal.ZERO)
                .agreementStartDate(LocalDate.now().plusMonths(1))
                .build();
        testAgreement.setId(100L);
    }

    // =====================================================================
    // TEST 1 — createPaymentPlan : création réussie avec calcul des montants
    // =====================================================================
    @Test
    @DisplayName("createPaymentPlan - doit créer un plan et calculer les mensualités correctement")
    void createPaymentPlan_shouldCreatePlanWithCorrectInstallments() {
        // GIVEN
        CreatePaymentPlanDTO dto = new CreatePaymentPlanDTO();
        dto.setCaseId(10L);
        dto.setTotalAmount(new BigDecimal("6000.00"));
        dto.setInterestRate(new BigDecimal("10"));   // 10% → intérêts = 600 → total = 6600
        dto.setNumberOfInstallments(6);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));
        dto.setDescription("Plan test");

        when(caseRepository.findById(10L)).thenReturn(Optional.of(testCase));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(agreementRepository.save(any(Agreement.class))).thenAnswer(inv -> {
            Agreement a = inv.getArgument(0);
            a.setId(100L);
            return a;
        });
        when(installmentPaymentRepository.saveAll(anyList())).thenAnswer(inv -> inv.getArgument(0));
        when(validationRepository.save(any())).thenReturn(null);

        // WHEN
        PaymentPlanResponseDTO result = paymentPlanService.createPaymentPlan(dto, 1L);

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getNumberOfInstallments()).isEqualTo(6);
        // mensualité = 6600 / 6 = 1100
        assertThat(result.getMonthlyPaymentAmount()).isEqualByComparingTo(new BigDecimal("1100.00"));
        assertThat(result.getInterestAmount()).isEqualByComparingTo(new BigDecimal("600.00"));
        assertThat(result.getTotalAmountWithInterest()).isEqualByComparingTo(new BigDecimal("6600.00"));

        verify(agreementRepository).save(any(Agreement.class));
        verify(installmentPaymentRepository).saveAll(anyList());
        verify(validationRepository).save(any(AgreementValidation.class));
    }

    // =====================================================================
    // TEST 2 — createPaymentPlan : cas introuvable → exception
    // =====================================================================
    @Test
    @DisplayName("createPaymentPlan - doit lever une exception si le cas n'existe pas")
    void createPaymentPlan_shouldThrowWhenCaseNotFound() {
        // GIVEN
        CreatePaymentPlanDTO dto = new CreatePaymentPlanDTO();
        dto.setCaseId(999L);
        dto.setTotalAmount(new BigDecimal("1000.00"));
        dto.setNumberOfInstallments(3);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));

        when(caseRepository.findById(999L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThatThrownBy(() -> paymentPlanService.createPaymentPlan(dto, 1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Case not found");

        verify(agreementRepository, never()).save(any());
    }

    // =====================================================================
    // TEST 3 — getPaymentPlanById : retourne le bon DTO
    // =====================================================================
    @Test
    @DisplayName("getPaymentPlanById - doit retourner le plan correspondant à l'ID")
    void getPaymentPlanById_shouldReturnCorrectPlan() {
        // GIVEN
        InstallmentPayment installment = InstallmentPayment.builder()
                .installmentNumber(1)
                .dueDate(LocalDate.now().plusMonths(1))
                .amount(new BigDecimal("500.00"))
                .paidAmount(BigDecimal.ZERO)
                .status(PaymentStatusEnum.EN_ATTENTE)
                .reminderSent(false)
                .agreement(testAgreement)
                .build();
        installment.setId(1L);

        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of(installment));

        // WHEN
        PaymentPlanResponseDTO result = paymentPlanService.getPaymentPlanById(100L);

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getAgreementCode()).isEqualTo("AGR-TEST1234");
        assertThat(result.getInstallments()).hasSize(1);
        assertThat(result.getInstallments().get(0).getStatus()).isEqualTo(PaymentStatusEnum.EN_ATTENTE);
    }

    // =====================================================================
    // TEST 4 — validatePaymentPlan : statut passe à ACCEPTE
    // =====================================================================
    @Test
    @DisplayName("validatePaymentPlan - doit changer le statut à ACCEPTE et enregistrer la validation")
    void validatePaymentPlan_shouldSetStatusAccepte() {
        // GIVEN
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(agreementRepository.save(any())).thenReturn(testAgreement);
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of());

        // WHEN
        paymentPlanService.validatePaymentPlan(100L, 1L, "Approuvé");

        // THEN
        assertThat(testAgreement.getAgreementStatus()).isEqualTo(AgreementStatusTypesEnum.ACCEPTE);
        assertThat(testAgreement.getValidator()).isEqualTo(testUser);
        verify(validationRepository).save(any(AgreementValidation.class));
    }

    // =====================================================================
    // TEST 5 — rejectPaymentPlan : statut passe à REJETE
    // =====================================================================
    @Test
    @DisplayName("rejectPaymentPlan - doit changer le statut à REJETE avec la raison")
    void rejectPaymentPlan_shouldSetStatusRejete() {
        // GIVEN
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(agreementRepository.save(any())).thenReturn(testAgreement);
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of());

        // WHEN
        paymentPlanService.rejectPaymentPlan(100L, 1L, "Montant trop élevé");

        // THEN
        assertThat(testAgreement.getAgreementStatus()).isEqualTo(AgreementStatusTypesEnum.REJETE);
        assertThat(testAgreement.getRejectionReason()).isEqualTo("Montant trop élevé");
        verify(validationRepository).save(any(AgreementValidation.class));
    }

    // =====================================================================
    // TEST 6 — recordInstallmentPayment : toutes échéances payées → TERMINE
    // =====================================================================
    @Test
    @DisplayName("recordInstallmentPayment - doit marquer le plan TERMINE si toutes les échéances sont payées")
    void recordInstallmentPayment_shouldSetAgreementTermineWhenAllPaid() {
        // GIVEN
        InstallmentPayment installment = InstallmentPayment.builder()
                .amount(new BigDecimal("500.00"))
                .paidAmount(BigDecimal.ZERO)
                .status(PaymentStatusEnum.EN_ATTENTE)
                .agreement(testAgreement)
                .build();
        installment.setId(1L);

        // Après paiement, l'échéance sera REGLE → on simule que c'est la seule
        InstallmentPayment paidInstallment = InstallmentPayment.builder()
                .amount(new BigDecimal("500.00"))
                .paidAmount(new BigDecimal("500.00"))
                .status(PaymentStatusEnum.REGLE)
                .agreement(testAgreement)
                .build();
        paidInstallment.setId(1L);

        when(installmentPaymentRepository.findById(1L)).thenReturn(Optional.of(installment));
        when(installmentPaymentRepository.save(any())).thenReturn(paidInstallment);
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of(paidInstallment));
        when(agreementRepository.save(any())).thenReturn(testAgreement);

        // WHEN
        paymentPlanService.recordInstallmentPayment(1L, null);

        // THEN
        assertThat(installment.getStatus()).isEqualTo(PaymentStatusEnum.REGLE);
        assertThat(testAgreement.getAgreementStatus()).isEqualTo(AgreementStatusTypesEnum.TERMINE);
        verify(agreementRepository).save(testAgreement);
    }

    // =====================================================================
    // TEST 7 — getPaymentPlanStatus : retourne le bon statut
    // =====================================================================
    @Test
    @DisplayName("getPaymentPlanStatus - doit retourner le statut actuel du plan")
    void getPaymentPlanStatus_shouldReturnCorrectStatus() {
        // GIVEN
        testAgreement.setAgreementStatus(AgreementStatusTypesEnum.ACCEPTE);
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));

        // WHEN
        AgreementStatusTypesEnum status = paymentPlanService.getPaymentPlanStatus(100L);

        // THEN
        assertThat(status).isEqualTo(AgreementStatusTypesEnum.ACCEPTE);
    }

    // =====================================================================
    // TEST 8 — getUpcomingInstallments : retourne les échéances à venir
    // =====================================================================
    @Test
    @DisplayName("getUpcomingInstallments - doit retourner les échéances dans les X prochains jours")
    void getUpcomingInstallments_shouldReturnInstallmentsWithinRange() {
        // GIVEN
        LocalDate today = LocalDate.now();
        InstallmentPayment upcoming = InstallmentPayment.builder()
                .installmentNumber(2)
                .dueDate(today.plusDays(3))
                .amount(new BigDecimal("300.00"))
                .paidAmount(BigDecimal.ZERO)
                .status(PaymentStatusEnum.EN_ATTENTE)
                .reminderSent(false)
                .agreement(testAgreement)
                .build();
        upcoming.setId(5L);

        when(installmentPaymentRepository.findUpcomingInstallmentsByUser(eq(1L), any(), any()))
                .thenReturn(List.of(upcoming));

        // WHEN
        List<InstallmentDTO> result = paymentPlanService.getUpcomingInstallments(1L, 7);

        // THEN
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAgreementCode()).isEqualTo("AGR-TEST1234");
        assertThat(result.get(0).getAmount()).isEqualByComparingTo(new BigDecimal("300.00"));
    }
}
