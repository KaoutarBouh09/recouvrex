package com.recouvrex.process.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePaymentPlanDTO {
    
    @NotNull(message = "Case ID is required")
    private Long caseId;
    
    @NotNull(message = "Total amount is required")
    @Min(value = 1, message = "Amount must be positive")
    private BigDecimal totalAmount;
    
    @NotNull(message = "Number of installments is required")
    @Min(value = 1, message = "At least 1 installment required")
    private Integer numberOfInstallments;
    
    private BigDecimal interestRate = BigDecimal.ZERO;
    
    @NotNull(message = "First payment date is required")
    private LocalDate firstPaymentDate;
    
    private Long templateId; // Optionnel : utiliser un template
    
    private String description;
}