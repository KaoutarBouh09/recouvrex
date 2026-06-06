package com.recouvrex.process.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdatePaymentPlanDTO {

    @NotNull(message = "Le nombre de mensualités est obligatoire")
    @Min(value = 1, message = "Le nombre de mensualités doit être au moins 1")
    private Integer numberOfInstallments;

    @NotNull(message = "Le taux d'intérêt est obligatoire")
    private BigDecimal interestRate;

    private String description;
}
