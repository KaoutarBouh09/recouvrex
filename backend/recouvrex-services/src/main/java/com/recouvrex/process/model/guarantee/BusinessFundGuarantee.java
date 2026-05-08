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
@Table(name = "business_fund_guarantee") // Nom de la table dans la base de données
// Classe représentant une garantie de fonds de commerce, une sous-classe de
// Garantie
public class BusinessFundGuarantee extends Guarantee {

    // Nom et prénom du propriétaire (personne physique)
    private String ownerFullName;

    // Raison sociale de la société
    private String corporateName;

    // Capital social de la société
    private BigDecimal socialCapital;

    // Numéro du Registre de Commerce
    private String commerceRegistryNumber;

    // Ville du Registre de Commerce
    private String commerceRegistryCity;

    // Nom et prénom du gérant
    private String managerFullName;

    // CIN (Carte d'identité nationale) du gérant
    private String managerNationalIDCard;

    // Dénomination du fond de commerce
    private String tradeName;

    // Rang de nantissement
    private String pledgeRank;

    // Date de concrétisation du nantissement
    private LocalDate pledgeRealizationDate;

    // Date d'expiration du nantissement
    private LocalDate pledgeExpirationDate;

}

