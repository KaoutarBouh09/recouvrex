package com.recouvrex.process.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.model.enums.AgreementTypesEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="agreement")
public class Agreement extends BaseEntity {

    private String agreementId;

    private LocalDate agreementDate;

    @Enumerated(EnumType.STRING)
    private AgreementStatusTypesEnum agreementStatus;

    @Enumerated(EnumType.STRING)
    private AgreementTypesEnum agreementType;

    private LocalDate agreementStartDate;

    private LocalDate agreementValidityDate;

    @ManyToOne
    @JoinColumn(name = "initiator_id")
    private User initiator;

    @ManyToOne
    @JoinColumn(name = "validator_id")
    private User validator;

    @ManyToOne
    @JoinColumn(name = "case_id")
    private Case case1;

    @ManyToMany
    @JoinTable(
            name = "agreement_due_date",
            joinColumns = @JoinColumn(name = "agreement_id"),
            inverseJoinColumns = @JoinColumn(name = "due_date_id")
    )
    private List<DueDate> dueDates;

    private String agreementDescription;
    // Dans votre classe Agreement.java, ajoutez ces champs :

private BigDecimal monthlyPaymentAmount; // Montant de chaque mensualité

private BigDecimal totalAmountWithInterest; // Montant total avec intérêts

private BigDecimal interestAmount; // Montant des intérêts

private String rejectionReason; // Raison du rejet (si statut = REJECTED)

@ManyToOne
@JoinColumn(name = "template_id")
private PaymentPlanTemplate template; // Template utilisé

private String pdfFilePath; // Chemin vers le PDF généré

private LocalDateTime validatedAt; // Date de validation

private LocalDateTime completedAt; // Date de complétion

}
