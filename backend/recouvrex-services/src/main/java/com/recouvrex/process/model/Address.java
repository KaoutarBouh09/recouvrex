package com.recouvrex.process.model;

import com.recouvrex.process.model.enums.AddressTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "address")
public class Address extends BaseEntity{


    @Enumerated(EnumType.STRING)
    private AddressTypeEnum addressType; //Travail, domicile ou autres

    private Integer streetNumber;

    private String streetName;

    private String apartmentNumber;

    private String city;

    private String country;

    private String zipCode; //Code postal

    private String Line1;

    private String Line2;

    private String Line3;

    private String Line4;

    private String Line5;
}
