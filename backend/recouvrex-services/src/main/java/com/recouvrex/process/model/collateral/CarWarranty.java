package com.recouvrex.process.model.collateral;

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
@Table(name = "car_warranty")

public class CarWarranty implements Collateral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carWarrantyId;

    private String carMake; //Marque du véhicule

    private Integer modelYear;

    private String licensePlateNumber; //Plaque d'immatriculation

    private String fuelType; //type de carburant

    private Integer taxHorsePower; //puissance fiscale d'un vehicule
}
