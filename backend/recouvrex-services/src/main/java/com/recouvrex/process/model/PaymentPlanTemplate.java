package com.recouvrex.process.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payment_plan_template")
public class PaymentPlanTemplate extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String templateName; // Ex: "Plan 6 mois", "Plan 12 mois"

    @Column(nullable = false)
    private Integer numberOfInstallments; // Nombre de mensualités

    private BigDecimal interestRate; // Taux d'intérêt (optionnel)

    private String description; // Description du template

    @Column(nullable = false)
    private Boolean isActive = true; // Template actif ou non

    private Integer minAmount; // Montant minimum pour ce plan
    private Integer maxAmount; // Montant maximum pour ce plan
}