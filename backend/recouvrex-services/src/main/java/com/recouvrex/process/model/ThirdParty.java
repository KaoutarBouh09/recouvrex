package com.recouvrex.process.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recouvrex.process.model.enums.DocumentTypesEnum;
import com.recouvrex.process.model.enums.ThirdPartyTypesEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

//Classe Tiers
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="thirdparty")
public class ThirdParty extends BaseEntity {

    private String thirdPartyId;
    @Enumerated(EnumType.STRING)
    private ThirdPartyTypesEnum tiersType;

    private String title;

    private String lastName;

    private String firstName;

    private String companyName; //raison sociale

    private LocalDate birthDate;

    private String nationality;

    private String countryOfResidence;

    private String businessSector; //Secteur d'activité

    private String legalForm; //Forme juridique

    private String occupation; //Profession

    private String personalEmail;

    private String businessEmail;

    private String privatePhone; //Telephone personnel

    private String businessPhone;

    private String landLinePhone; //Telephone fixe

    private String faxNumber;

    private String commercialRegister; //Registre de commerce, datatype ???????

    @Enumerated(EnumType.STRING)
    private DocumentTypesEnum supportingDocumentType; //Type Pièce justificative

    private String supportingDocumentNumber; //Numero de pièce justificative

    private LocalDate supportingDocumentExpirationDate; //Date d'expiration piece justificative

    private String maritalStatus;

   /* @OneToMany(mappedBy = "thirdParty", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Contract> contracts = new ArrayList<>();*/

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

public String getChatbotLink() {
    return "http://127.0.0.1:5000/?client_id=" + this.thirdPartyId;
}

}

