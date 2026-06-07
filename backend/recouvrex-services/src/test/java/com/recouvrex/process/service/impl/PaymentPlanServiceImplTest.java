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

        // ✅ Statut dossier non bloquant — requis par la vérification dans createPaymentPlan
        Status status = new Status();
        status.setStatus("Contentieux");

        testCase = new Case();
        testCase.setId(10L);
        testCase.setTotalAmount(new BigDecimal("5000.00"));
        testCase.setStatus(status);

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
        dto.setTotalAmount(new BigDecimal("5000.00"));
        dto.setNumberOfInstallments(10);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));

        when(caseRepository.findById(999L)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThatThrownBy(() -> paymentPlanService.createPaymentPlan(dto, 1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Case not found");
    }

    // =====================================================================
    // TEST 3 — createPaymentPlan : statut dossier bloquant → exception
    // =====================================================================
    @Test
    @DisplayName("createPaymentPlan - doit refuser si le dossier est Radié")
    void createPaymentPlan_shouldThrowWhenCaseStatusBlocked() {
        // GIVEN
        Status blockedStatus = new Status();
        blockedStatus.setStatus("Radie");
        testCase.setStatus(blockedStatus);

        CreatePaymentPlanDTO dto = new CreatePaymentPlanDTO();
        dto.setCaseId(10L);
        dto.setTotalAmount(new BigDecimal("5000.00"));
        dto.setNumberOfInstallments(6);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));

        when(caseRepository.findById(10L)).thenReturn(Optional.of(testCase));

        // WHEN / THEN
        assertThatThrownBy(() -> paymentPlanService.createPaymentPlan(dto, 1L))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Radie");
    }

    // =====================================================================
    // TEST 4 — validatePaymentPlan : statut passe à ACCEPTE
    // =====================================================================
    @Test
    @DisplayName("validatePaymentPlan - doit passer le statut à ACCEPTE")
    void validatePaymentPlan_shouldSetStatusToAccepted() {
        // GIVEN
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(agreementRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(validationRepository.save(any())).thenReturn(null);
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of());

        // WHEN
        PaymentPlanResponseDTO result = paymentPlanService.validatePaymentPlan(100L, 1L, "OK");

        // THEN
        assertThat(result.getStatus()).isEqualTo(AgreementStatusTypesEnum.ACCEPTE);
        verify(agreementRepository).save(argThat(a -> a.getAgreementStatus() == AgreementStatusTypesEnum.ACCEPTE));
    }

    // =====================================================================
    // TEST 5 — rejectPaymentPlan : statut passe à REJETE
    // =====================================================================
    @Test
    @DisplayName("rejectPaymentPlan - doit passer le statut à REJETE")
    void rejectPaymentPlan_shouldSetStatusToRejected() {
        // GIVEN
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(agreementRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(validationRepository.save(any())).thenReturn(null);
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of());

        // WHEN
        PaymentPlanResponseDTO result = paymentPlanService.rejectPaymentPlan(100L, 1L, "Motif rejet");

        // THEN
        assertThat(result.getStatus()).isEqualTo(AgreementStatusTypesEnum.REJETE);
        verify(agreementRepository).save(argThat(a -> a.getAgreementStatus() == AgreementStatusTypesEnum.REJETE));
    }

    // =====================================================================
    // TEST 6 — recordInstallmentPayment : échéance marquée comme réglée
    // =====================================================================
    @Test
    @DisplayName("recordInstallmentPayment - doit marquer l'échéance comme REGLE")
    void recordInstallmentPayment_shouldMarkInstallmentAsPaid() {
        // GIVEN
        InstallmentPayment installment = InstallmentPayment.builder()
                .installmentNumber(1)
                .amount(new BigDecimal("500.00"))
                .paidAmount(BigDecimal.ZERO)
                .status(PaymentStatusEnum.EN_ATTENTE)
                .agreement(testAgreement)
                .build();
        installment.setId(1L);

        when(installmentPaymentRepository.findById(1L)).thenReturn(Optional.of(installment));
        when(installmentPaymentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of(installment));

        // WHEN
        paymentPlanService.recordInstallmentPayment(1L, null);

        // THEN
        assertThat(installment.getStatus()).isEqualTo(PaymentStatusEnum.REGLE);
        assertThat(installment.getPaidAmount()).isEqualByComparingTo(new BigDecimal("500.00"));
        assertThat(installment.getPaidDate()).isEqualTo(LocalDate.now());
    }

    // =====================================================================
    // TEST 7 — recordInstallmentPayment : toutes payées → accord TERMINE
    // =====================================================================
    @Test
    @DisplayName("recordInstallmentPayment - doit terminer l'accord si toutes les échéances sont réglées")
    void recordInstallmentPayment_shouldTerminateAgreementWhenAllPaid() {
        // GIVEN
        InstallmentPayment inst1 = InstallmentPayment.builder()
                .installmentNumber(1).amount(new BigDecimal("500.00"))
                .status(PaymentStatusEnum.REGLE).agreement(testAgreement).build();
        inst1.setId(1L);

        InstallmentPayment inst2 = InstallmentPayment.builder()
                .installmentNumber(2).amount(new BigDecimal("500.00"))
                .paidAmount(BigDecimal.ZERO).status(PaymentStatusEnum.EN_ATTENTE)
                .agreement(testAgreement).build();
        inst2.setId(2L);

        when(installmentPaymentRepository.findById(2L)).thenReturn(Optional.of(inst2));
        when(installmentPaymentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of(inst1, inst2));
        when(agreementRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        // WHEN
        paymentPlanService.recordInstallmentPayment(2L, null);

        // THEN
        verify(agreementRepository).save(argThat(a -> a.getAgreementStatus() == AgreementStatusTypesEnum.TERMINE));
    }

    // =====================================================================
    // TEST 8 — getPaymentPlanById : retourne le bon plan
    // =====================================================================
    @Test
    @DisplayName("getPaymentPlanById - doit retourner le plan correspondant")
    void getPaymentPlanById_shouldReturnCorrectPlan() {
        // GIVEN
        when(agreementRepository.findById(100L)).thenReturn(Optional.of(testAgreement));
        when(installmentPaymentRepository.findByAgreementIdOrderByInstallmentNumber(100L))
                .thenReturn(List.of());

        // WHEN
        PaymentPlanResponseDTO result = paymentPlanService.getPaymentPlanById(100L);

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getAgreementCode()).isEqualTo("AGR-TEST1234");
        assertThat(result.getStatus()).isEqualTo(AgreementStatusTypesEnum.EN_COURS);
    }
}
