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
@Table(name = "credit")
public class Credit extends BaseEntity {

    private String creditId; // Identifiant du crédit

    private String creditType; // Type de crédit
    private BigDecimal nominalAmount; // Montant nominal
    private BigDecimal cumulativeDisbursement; // Déblocage cumulatif
    private LocalDate setupDate; // Date de mise en place
    private LocalDate firstInstallmentDate; // Date de la première échéance
    private double nominalRate; // Taux nominal
    private String rateNature; // Nature du taux
    private int installmentCount; // Nombre d'échéances
    private String deferredType; // Type de différé
    private boolean restructured; // Restructuré (oui/non)
    private int restructuringCount; // Nombre de restructurations
    private String creditStatus; // Statut du crédit
    private BigDecimal constantInstallmentAmount; // Montant de l'échéance constante
    private BigDecimal unpaidAmount; // Montant impayé
    private BigDecimal insuranceAmount; // Montant de l'assurance
    private int triggeredInstallmentNumber; // Numéro d'échéance déclenchée
    private LocalDate openingDate; // Date d'ouverture
    private LocalDate modificationDate; // Date de modification
    private LocalDate lastStatusDate; // Date du dernier statut
    private BigDecimal cumulativeRedemptionAmount; // Montant cumulé des rachats
    private LocalDate lastRedemptionDate; // Date du dernier rachat
    private String agency; // Agence
    private String manager; // Gestionnaire

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "thirdparty_id")
    private ThirdParty thirdParty;

    private boolean reminderSent; // Relance déjà envoyée ?
}
