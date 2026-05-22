package com.recouvrex.process.controller;

import com.recouvrex.process.dto.CreatePaymentPlanDTO;
import com.recouvrex.process.dto.InstallmentDTO;
import com.recouvrex.process.dto.PaymentPlanResponseDTO;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import com.recouvrex.process.service.PaymentPlanService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests PaymentPlanController (REST)")
class PaymentPlanControllerTest {

    @Mock
    private PaymentPlanService paymentPlanService;

    @InjectMocks
    private PaymentPlanController paymentPlanController;

    private PaymentPlanResponseDTO buildResponseDTO() {
        return PaymentPlanResponseDTO.builder()
                .agreementId(1L)
                .agreementCode("AGR-TEST1234")
                .agreementDate(LocalDate.now())
                .status(AgreementStatusTypesEnum.EN_COURS)
                .totalAmount(new BigDecimal("5000.00"))
                .monthlyPaymentAmount(new BigDecimal("500.00"))
                .interestAmount(BigDecimal.ZERO)
                .totalAmountWithInterest(new BigDecimal("5000.00"))
                .numberOfInstallments(10)
                .firstPaymentDate(LocalDate.now().plusMonths(1))
                .initiatorName("Kaoutar Bouh")
                .installments(List.of())
                .build();
    }

    @Test
    @DisplayName("createPaymentPlan - doit retourner 201 avec le plan créé")
    void createPaymentPlan_shouldReturn201() {
        CreatePaymentPlanDTO dto = new CreatePaymentPlanDTO();
        dto.setCaseId(10L);
        dto.setTotalAmount(new BigDecimal("5000.00"));
        dto.setNumberOfInstallments(10);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));

        when(paymentPlanService.createPaymentPlan(any(CreatePaymentPlanDTO.class), eq(1L)))
                .thenReturn(buildResponseDTO());

        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.createPaymentPlan(dto, 1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getAgreementCode()).isEqualTo("AGR-TEST1234");
    }

    @Test
    @DisplayName("createPaymentPlan - doit retourner 500 si le service lève une exception")
    void createPaymentPlan_shouldReturn500OnError() {
        CreatePaymentPlanDTO dto = new CreatePaymentPlanDTO();
        dto.setCaseId(999L);
        dto.setTotalAmount(new BigDecimal("1000.00"));
        dto.setNumberOfInstallments(3);
        dto.setFirstPaymentDate(LocalDate.now().plusMonths(1));

        when(paymentPlanService.createPaymentPlan(any(), anyLong()))
                .thenThrow(new RuntimeException("Case not found"));

        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.createPaymentPlan(dto, 1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    @DisplayName("getPaymentPlan - doit retourner 200 avec le plan")
    void getPaymentPlan_shouldReturn200() {
        when(paymentPlanService.getPaymentPlanById(1L)).thenReturn(buildResponseDTO());

        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.getPaymentPlan(1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getAgreementCode()).isEqualTo("AGR-TEST1234");
    }

    @Test
    @DisplayName("getPaymentPlan - doit retourner 404 si le plan n'existe pas")
    void getPaymentPlan_shouldReturn404WhenNotFound() {
        when(paymentPlanService.getPaymentPlanById(999L))
                .thenThrow(new RuntimeException("Agreement not found"));

        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.getPaymentPlan(999L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    @DisplayName("getPaymentPlans - doit retourner la liste des plans par cas")
    void getPaymentPlans_byCaseId_shouldReturn200() {
        when(paymentPlanService.getPaymentPlansByCase(10L))
                .thenReturn(List.of(buildResponseDTO()));

        ResponseEntity<List<PaymentPlanResponseDTO>> response =
                paymentPlanController.getPaymentPlans(10L, null, null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
    }

    @Test
    @DisplayName("getPaymentPlans - doit retourner 400 si aucun filtre fourni")
    void getPaymentPlans_noParam_shouldReturn400() {
        ResponseEntity<List<PaymentPlanResponseDTO>> response =
                paymentPlanController.getPaymentPlans(null, null, null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        verify(paymentPlanService, never()).getPaymentPlansByCase(any());
    }

    @Test
    @DisplayName("validatePaymentPlan - doit retourner 200 avec statut ACCEPTE")
    void validatePaymentPlan_shouldReturn200() {
        PaymentPlanResponseDTO validated = buildResponseDTO();
        validated.setStatus(AgreementStatusTypesEnum.ACCEPTE);

        when(paymentPlanService.validatePaymentPlan(eq(1L), eq(2L), anyString()))
                .thenReturn(validated);

        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.validatePaymentPlan(1L, 2L, Map.of("comment", "Approuvé"));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getStatus()).isEqualTo(AgreementStatusTypesEnum.ACCEPTE);
    }

    @Test
    @DisplayName("rejectPaymentPlan - doit retourner 400 si la raison est absente")
    void rejectPaymentPlan_shouldReturn400WhenNoReason() {
        ResponseEntity<PaymentPlanResponseDTO> response =
                paymentPlanController.rejectPaymentPlan(1L, 2L, Map.of("comment", "test"));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        verify(paymentPlanService, never()).rejectPaymentPlan(any(), any(), any());
    }

    @Test
    @DisplayName("recordInstallmentPayment - doit retourner 200 après enregistrement")
    void recordInstallmentPayment_shouldReturn200() {
        doNothing().when(paymentPlanService).recordInstallmentPayment(1L, null);

        ResponseEntity<Map<String, String>> response =
                paymentPlanController.recordInstallmentPayment(1L, null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().get("message")).isEqualTo("Paiement enregistré avec succès");
    }

    @Test
    @DisplayName("getUpcomingInstallments - doit retourner les échéances à venir")
    void getUpcomingInstallments_shouldReturn200() {
        InstallmentDTO dto = InstallmentDTO.builder()
                .id(5L)
                .installmentNumber(2)
                .dueDate(LocalDate.now().plusDays(4))
                .amount(new BigDecimal("500.00"))
                .status(PaymentStatusEnum.EN_ATTENTE)
                .agreementCode("AGR-TEST1234")
                .build();

        when(paymentPlanService.getUpcomingInstallments(1L, 7))
                .thenReturn(List.of(dto));

        ResponseEntity<List<InstallmentDTO>> response =
                paymentPlanController.getUpcomingInstallments(1L, 7);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody().get(0).getAgreementCode()).isEqualTo("AGR-TEST1234");
    }
}
