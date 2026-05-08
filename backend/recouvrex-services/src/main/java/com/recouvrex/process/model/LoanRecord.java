package com.recouvrex.process.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="loan_record")
public class LoanRecord extends BaseEntity {


    private Long loanRecordId;
    private BigDecimal interestRateType; //Nature du taux
    private Long dateDueNumber; //Nombre d'échéances
    private String deferredPaymentType; //Type différé
    private Boolean restructured;
    private Integer numberOfRestructurings; //nombre de restructuration
    private String creditStatus; // Credit statuts
    private BigDecimal constantInstallmentAmount; //montant échéance constante
    private BigDecimal outstandingBalance; // montant impayés
    private BigDecimal insuranceAmount; // montant assurance
    private Long triggeredInstallmentNumber; //Numéro échéance déclenchée
    private LocalDate openingDate;
    private LocalDate modificationDate;
    private LocalDate lastStatusDate;
    private BigDecimal cumulativeRedemptionAmounts; //cumul montants rachats
    private LocalDate lastRedemptionDate; //date dernier rachat
    private String agency;
    private String manager;
}
