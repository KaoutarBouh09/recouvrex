package com.recouvrex.process.model.guarantee;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@Table(name = "real_estate_guarantee") // Nom de la table dans la base de données
// Classe représentant une garantie de bien immobilier, une sous-classe de
// Garantie
public class RealEstateGuarantee extends Guarantee {

    // Nom du propriétaire du bien immobilier
    private String ownerLastName;

    // Prénom du propriétaire du bien immobilier
    private String ownerFirstName;

    // Adresse du propriétaire du bien immobilier
    private String ownerAddress;

    // Numéro de CIN (Carte d'identité nationale) du propriétaire du bien immobilier
    private String ownerNationalID;

    // Nom du titre foncier du bien immobilier
    private String landTitleName;

    // Numéro du titre foncier du bien immobilier
    private String landTitleNumber;

    // Acte d'achat du bien immobilier
    private String purchaseDeed;

    // Rang du bien immobilier
    private String rank;

    // Nom de la conservation foncière du bien immobilier
    private String landRegistryName;

    // Montant du prêt associé au bien immobilier
    private BigDecimal loanAmount;

    // Nom de la propriété associée au bien immobilier
    private String propertyName;

    // Superficie du bien immobilier
    private BigDecimal area;

    // Description des constructions du bien immobilier
    private String constructionDescription;

    // Date d'inscription à la conservation foncière du bien immobilier
    private LocalDate registrationDate;
}

