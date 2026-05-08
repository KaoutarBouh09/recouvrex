package com.recouvrex.process.model.guarantee;

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
@Table(name = "vehicle_guarantee") // Nom de la table dans la base de données
// Cette classe représente une garantie de véhicule, étendant la classe de base Garantie.
public class VehicleGuarantee  extends Guarantee {

    // The brand of the vehicle.
    private String vehicleBrand;

    // The model year of the vehicle.
    private Integer modelYear;

    // The registration number of the vehicle.
    private String registrationNumber;

    // The type of fuel used by the vehicle.
    private String fuelType;

    // The fiscal horsepower of the vehicle.
    private Integer fiscalHorsepower;

}
