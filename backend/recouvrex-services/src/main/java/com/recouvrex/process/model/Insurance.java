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
@Table(name = "insurance")
public class Insurance extends BaseEntity{

    private String insurancePolicyNumber; //Numéro police, code unique associé à l'assurance ex: 123-4567-8910

    private BigDecimal amountInsured; //Montant garantie par l'assurance

    private String insuranceType; //Type de l'assurance

    private LocalDate effectiveDate; //Date de début de validité ? bon type pour la date ?

    private LocalDate expirationDate; //Date de fin de validité

    private String insuranceCompany; //Compagnie d'assurance
}
