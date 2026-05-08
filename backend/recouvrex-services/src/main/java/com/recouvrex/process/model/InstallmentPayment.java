package com.recouvrex.process.model;

import com.recouvrex.process.model.enums.PaymentStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "installment_payment")
public class InstallmentPayment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "agreement_id", nullable = false)
    private Agreement agreement;

    @Column(nullable = false)
    private Integer installmentNumber; // Numéro de l'échéance (1, 2, 3...)

    @Column(nullable = false)
    private LocalDate dueDate; // Date d'échéance

    @Column(nullable = false)
    private BigDecimal amount; // Montant à payer

    private BigDecimal paidAmount = BigDecimal.ZERO; // Montant payé

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatusEnum status = PaymentStatusEnum.EN_ATTENTE;

    private LocalDate paidDate; // Date de paiement effectif

    @ManyToOne
    @JoinColumn(name = "reglement_id")
    private Reglement reglement; // Lien vers le règlement

    private LocalDateTime reminderSentAt; // Date d'envoi du rappel

    @Column(nullable = false)
    private Boolean reminderSent = false; // Rappel envoyé ou non
}