package com.recouvrex.process.model.collateral;

import com.recouvrex.process.model.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="collateral_personal_guarantee")

//Classe caution personnelle
public class CollateralPersonalGuarantee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personalGuaranteeId;

    private String guarantorLastName; //Nom du garant

    private String guarantorFirstName; //Prenom du garant

    private String mobilePhoneNumber; //Numero de telephone

    private String idCardNumber; //Numero de CIN

    private LocalDate idCardNumberExpirationDate; //Date d'expiration de la CIN

    private String relationshipWithTheClient; //Nature du lien avec le client

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="residential_address_id")
    private Address residentialAddress; //Adresse de residence

    private String occupation; //Profession

    private BigDecimal monthlyIncome; //Revenu mensuel

    private BigDecimal residualIncome; //Revenu résiduel

    private BigDecimal totalOutstandingInstallments; // Total des échéances en cours

    private Integer lengthOfService; // Ancienneté dans l'activité

    private String Employer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="business_address_id")
    private Address businessAddress; // Adresse professionnelle
}
