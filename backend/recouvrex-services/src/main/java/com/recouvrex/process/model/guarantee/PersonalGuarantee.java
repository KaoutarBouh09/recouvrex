package com.recouvrex.process.model.guarantee;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "personal_guarantee") // Nom de la table dans la base de données
// Classe représentant une garantie de caution personnelle, une sous-classe de
// Garantie
public class PersonalGuarantee extends Guarantee {

    // Nom du garant
    private String guarantorLastName;

    // Prénom du garant
    private String guarantorFirstName;

    // Numéro de GSM du garant
    private String guarantorPhoneNumber;

    // Numéro de CIN (Carte d'identité nationale) du garant
    private String guarantorNationalID;

    // Date d'expiration de la CIN du garant
    private LocalDate guarantorIDExpirationDate;

    // Nature du lien avec le client
    private String relationshipWithClient;

    // Adresse de résidence du garant
    private String guarantorResidenceAddress;

    // Activité du garant
    private String guarantorActivity;

    // Revenu mensuel du garant
    private BigDecimal guarantorMonthlyIncome;

    // Revenu résiduel du garant
    private BigDecimal guarantorResidualIncome;

    // Total des échéances en cours
    private BigDecimal totalOutstandingInstallments;

    // Ancienneté dans l'activité
    private Integer activitySeniority;

    // Employeur du garant
    private String guarantorEmployer;

    // Adresse professionnelle du garant
    private String guarantorProfessionalAddress;

}

