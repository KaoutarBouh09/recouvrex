package com.recouvrex.process.model.guarantee;

import java.util.List;

import lombok.Data;

@Data
public class GuaranteesByTypeDTO {
    private List<BusinessFundGuarantee> businessFundGuarantees;
    private List<MortgageGuarantee> mortgageGuarantees;
    private List<PersonalGuarantee> personalGuarantees;
    private List<RealEstateGuarantee> realEstateGuarantees;
    private List<VehicleGuarantee> vehicleGuarantees;
}