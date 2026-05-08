package com.recouvrex.process.controller;

import com.recouvrex.process.model.ReminderHistory;
import com.recouvrex.process.repository.ReminderHistoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@RequestMapping("/api/reminders")
public class ReminderHistoryController {

    @Autowired
    private ReminderHistoryRepository reminderHistoryRepository;

    @Operation(summary = "Get reminder history by installment",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @GetMapping("/installment/{installmentId}")
    public ResponseEntity<List<ReminderHistory>> getByInstallment(@PathVariable Long installmentId) {
        return ResponseEntity.ok(
            reminderHistoryRepository.findByInstallmentIdOrderBySentAtDesc(installmentId)
        );
    }

    @Operation(summary = "Get reminder history by client",
               security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @GetMapping("/client/{thirdPartyId}")
    public ResponseEntity<List<ReminderHistory>> getByClient(@PathVariable Long thirdPartyId) {
        return ResponseEntity.ok(
            reminderHistoryRepository.findByInstallment_Agreement_Case1_ThirdParty_IdOrderBySentAtDesc(thirdPartyId)
        );
    }
}