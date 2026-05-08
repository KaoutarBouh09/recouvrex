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
@Table(name = "mortgage_guarantee") // Nom de la table dans la base de données
public class MortgageGuarantee  extends Guarantee {
     // Nom et prénom du propriétaire
     private String ownerFullName;

     // Adresse du propriétaire
     private String ownerAddress;

     // Numéro de CIN (Carte d'identité nationale)
     private String nationalIDCardNumber;

     // Nom du titre foncier
     private String landTitleName;

     // Numéro du titre foncier
     private String landTitleNumber;

     // Rang de l'hypothèque
     private String mortgageRank;

     // Nom de la conservation foncière
     private String landRegistryOfficeName;

     // Montant du prêt hypothécaire
     private BigDecimal mortgageLoanAmount;

     // Nom de la propriété hypothéquée
     private String mortgagedPropertyName;

     // Superficie de la propriété hypothéquée
     private BigDecimal mortgagedPropertyArea;

     // Description des constructions sur la propriété hypothéquée
     private String constructionsDescription;

     // Date d'inscription à la conservation foncière
     private LocalDate registrationDate;

     // Statut de l'hypothèque (par exemple, actif, inactif, etc.)
     private String mortgageStatus;

}
