package com.recouvrex.process.model.collateral;
import com.recouvrex.process.model.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "mortgage")
//Classe Hypothèque
public class Mortgage implements Collateral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mortgageId;

    private String ownerLastName;

    private String ownerFirstName;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_address_id")
    private Address ownerAddress;

    private String idCardNumber; // Numero CIN

    private String landTitleName; //Nom du titre foncier

    private String landTitleNumber; //Numero du titre foncier

    private Integer priority; //Rang de l'hypothèque

    private String landRegistryOffice; //Nom de la conservation foncière

    private String propertyName; //Nom de la proprieté

    private Float area; //Superficie

    private BigDecimal loanAmount; // Montant du près

    private String buildingDescription; //Description des constructions

    private LocalDate registrationDateInLandRegistry; //Date d'inscription à la conservation foncière
}
