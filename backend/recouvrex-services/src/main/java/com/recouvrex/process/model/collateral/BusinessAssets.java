package com.recouvrex.process.model.collateral;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name="business_assets")
public class BusinessAssets implements Collateral{
    private String ownerLastName;

    private String ownerFirstName;

    private String companyName; //raison sociale de la societe

    private BigDecimal shareCapital; //Capital social

    @Id
    private Long commercialRegisterNumber; // Numéro du régistre de commerce

    private String commercialRegisterCity; //Ville du registre de commerce

    private String managerLastName;

    private String managerFirstName;

    private String managerIdCardNumber; //CIN du gérant

    private String businessTradeName; //Dénomination du fond de commerce

    private Integer rankingOfPledge; //Rang du nantissement

    private LocalDate pledgeRealizationDate; //Date de réalisation du nantissement

    private LocalDate pledgeExpirationDate; //Date d'expiration du nantissement
}
