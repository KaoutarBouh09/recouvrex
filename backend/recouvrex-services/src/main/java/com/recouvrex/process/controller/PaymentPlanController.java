package com.recouvrex.process.controller;

import com.recouvrex.process.dto.CreatePaymentPlanDTO;
import com.recouvrex.process.dto.InstallmentDTO;
import com.recouvrex.process.dto.PaymentPlanResponseDTO;
import com.recouvrex.process.dto.UpdatePaymentPlanDTO;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.service.PaymentPlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Map;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@Tag(name = "Payment Plan", description = "Payment Plan management API")
@RestController
@RequestMapping("/api/payment-plan")
@RequiredArgsConstructor
public class PaymentPlanController {

    private final PaymentPlanService paymentPlanService;

    /**
     * Créer un nouveau plan de paiement
     */
    @Operation(summary = "Create a new Payment Plan",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = PaymentPlanResponseDTO.class),
                            mediaType = "application/json") }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @PostMapping("/")
    public ResponseEntity<PaymentPlanResponseDTO> createPaymentPlan(
            @Valid @RequestBody CreatePaymentPlanDTO dto,
            @RequestParam("initiatorId") Long initiatorId) {
        try {
            PaymentPlanResponseDTO response = paymentPlanService.createPaymentPlan(dto, initiatorId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Modifier un plan de paiement (Agent uniquement, statut EN_COURS)
     */
    @Operation(summary = "Update a Payment Plan (Agent only, EN_COURS status)",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = PaymentPlanResponseDTO.class),
                            mediaType = "application/json") }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @PutMapping("/{id}/edit")
    public ResponseEntity<?> updatePaymentPlan(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePaymentPlanDTO dto) {
        try {
            PaymentPlanResponseDTO response = paymentPlanService.updatePaymentPlan(id, dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Supprimer un plan de paiement (Agent uniquement, statut EN_COURS ou REJETE)
     */
    @Operation(summary = "Delete a Payment Plan (Agent only, EN_COURS or REJETE status)",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePaymentPlan(@PathVariable Long id) {
        try {
            paymentPlanService.deletePaymentPlan(id);
            return new ResponseEntity<>(Map.of("message", "Plan supprimé avec succès"), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtenir un plan de paiement par ID
     */
    @Operation(summary = "Get Payment Plan by ID",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = PaymentPlanResponseDTO.class),
                            mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @GetMapping("/{id}")
    public ResponseEntity<PaymentPlanResponseDTO> getPaymentPlan(@PathVariable Long id) {
        try {
            PaymentPlanResponseDTO plan = paymentPlanService.getPaymentPlanById(id);
            return new ResponseEntity<>(plan, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/download-pdf/{id}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadPdf(@PathVariable Long id) {
        try {
            String pdfPath = paymentPlanService.generatePaymentPlanPdf(id);
            File file = new File(pdfPath);
            org.springframework.core.io.Resource resource =
                new org.springframework.core.io.FileSystemResource(file);
            return ResponseEntity.ok()
                   .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\"")
                   .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                   .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Obtenir la liste des plans de paiement (avec filtres)
     */
    @Operation(summary = "Get List of Payment Plans",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = PaymentPlanResponseDTO.class),
                            mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @GetMapping("/getPaymentPlans")
    public ResponseEntity<List<PaymentPlanResponseDTO>> getPaymentPlans(
            @RequestParam(value = "caseId", required = false) Long caseId,
            @RequestParam(value = "managerId", required = false) Long managerId,
            @RequestParam(value = "status", required = false) AgreementStatusTypesEnum status) {
        try {
            List<PaymentPlanResponseDTO> plans;
            if (caseId != null) {
                plans = paymentPlanService.getPaymentPlansByCase(caseId);
            } else if (managerId != null) {
                plans = paymentPlanService.getPendingPaymentPlans(managerId);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(plans, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Valider un plan de paiement
     */
    @Operation(summary = "Validate a Payment Plan",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @PutMapping("/validate/{id}")
    public ResponseEntity<PaymentPlanResponseDTO> validatePaymentPlan(
            @PathVariable Long id,
            @RequestParam("validatorId") Long validatorId,
            @RequestBody(required = false) Map<String, String> payload) {
        try {
            String comment = payload != null ? payload.get("comment") : null;
            PaymentPlanResponseDTO response = paymentPlanService.validatePaymentPlan(id, validatorId, comment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Rejeter un plan de paiement
     */
    @Operation(summary = "Reject a Payment Plan",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @PutMapping("/reject/{id}")
    public ResponseEntity<PaymentPlanResponseDTO> rejectPaymentPlan(
            @PathVariable Long id,
            @RequestParam("validatorId") Long validatorId,
            @RequestBody Map<String, String> payload) {
        try {
            String reason = payload.get("reason");
            if (reason == null || reason.trim().isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            PaymentPlanResponseDTO response = paymentPlanService.rejectPaymentPlan(id, validatorId, reason);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Annuler un plan de paiement
     */
    @Operation(summary = "Cancel a Payment Plan",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Map<String, String>> cancelPaymentPlan(
            @PathVariable Long id,
            @RequestParam("userId") Long userId,
            @RequestBody Map<String, String> payload) {
        try {
            String reason = payload.get("reason");
            paymentPlanService.cancelPaymentPlan(id, userId, reason);
            return new ResponseEntity<>(Map.of("message", "Plan annulé avec succès"), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Télécharger le PDF d'un plan
     */
    @Operation(summary = "Download Payment Plan PDF",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @GetMapping("/pdf/{id}")
    public ResponseEntity<Map<String, String>> downloadPdf1(@PathVariable Long id) {
        try {
            String pdfPath = paymentPlanService.generatePaymentPlanPdf(id);
            return new ResponseEntity<>(Map.of("pdfPath", pdfPath), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Enregistrer un paiement sur une échéance
     */
    @Operation(summary = "Record Installment Payment",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @PutMapping("/installments/{installmentId}/pay")
    public ResponseEntity<Map<String, String>> recordInstallmentPayment(
            @PathVariable Long installmentId,
            @RequestParam(value = "reglementId", required = false) Long reglementId) {
        try {
            paymentPlanService.recordInstallmentPayment(installmentId, reglementId);
            return new ResponseEntity<>(Map.of("message", "Paiement enregistré avec succès"), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Envoyer les rappels d'échéances
     */
    @Operation(summary = "Send Installment Reminders",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @PostMapping("/send-reminders")
    public ResponseEntity<Map<String, String>> sendReminders() {
        try {
            paymentPlanService.sendInstallmentReminders();
            return new ResponseEntity<>(Map.of("message", "Rappels envoyés avec succès"), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get upcoming installments for a user",
           security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @GetMapping("/upcoming-installments")
    public ResponseEntity<List<InstallmentDTO>> getUpcomingInstallments(
          @RequestParam("userId") Long userId,
          @RequestParam(value = "daysAhead", defaultValue = "7") int daysAhead) {
        try {
            List<InstallmentDTO> installments =
                paymentPlanService.getUpcomingInstallments(userId, daysAhead);
            return new ResponseEntity<>(installments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
