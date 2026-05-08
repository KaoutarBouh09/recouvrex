package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.guarantee.BusinessFundGuarantee;
import com.recouvrex.process.model.guarantee.Guarantee;
import com.recouvrex.process.model.guarantee.GuaranteesByTypeDTO;
import com.recouvrex.process.model.guarantee.MortgageGuarantee;
import com.recouvrex.process.model.guarantee.PersonalGuarantee;
import com.recouvrex.process.model.guarantee.RealEstateGuarantee;
import com.recouvrex.process.model.guarantee.VehicleGuarantee;
import com.recouvrex.process.repository.guarantee.*;
import com.recouvrex.process.service.GuaranteeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuaranteeServiceImpl implements GuaranteeService {

    @Autowired
    private BusinessFundGuaranteeRepository businessFundGuaranteeRepository;

    @Autowired
    private MortgageGuaranteeRepository mortgageGuaranteeRepository;

    @Autowired
    private PersonalGuaranteeRepository personalGuaranteeRepository;

    @Autowired
    private RealEstateGuaranteeRepository realEstateGuaranteeRepository;

    @Autowired
    private VehicleGuaranteeRepository vehicleGuaranteeRepository;

    @Override
    public Guarantee createGuarantee(Object guarantee, String type) {
        switch (type) {
            case "BusinessFund":
                return businessFundGuaranteeRepository.save((BusinessFundGuarantee) guarantee);
            case "Mortgage":
                return mortgageGuaranteeRepository.save((MortgageGuarantee) guarantee);
            case "Personal":
                return personalGuaranteeRepository.save((PersonalGuarantee) guarantee);
            case "RealEstate":
                return realEstateGuaranteeRepository.save((RealEstateGuarantee) guarantee);
            case "Vehicle":
                return vehicleGuaranteeRepository.save((VehicleGuarantee) guarantee);
            default:
                throw new IllegalArgumentException("Invalid guarantee type: " + type);
        }
    }

    @Override
    public Guarantee updateGuarantee(Long id, Object guarantee, String type) {
        switch (type) {
            case "BusinessFund":
                BusinessFundGuarantee businessFundGuarantee = businessFundGuaranteeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Guarantee not found with id: " + id));
                updateBusinessFundGuaranteeFields(businessFundGuarantee, (BusinessFundGuarantee) guarantee);
                return businessFundGuaranteeRepository.save(businessFundGuarantee);
            case "Mortgage":
                MortgageGuarantee mortgageGuarantee = mortgageGuaranteeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Guarantee not found with id: " + id));
                updateMortgageGuaranteeFields(mortgageGuarantee, (MortgageGuarantee) guarantee);
                return mortgageGuaranteeRepository.save(mortgageGuarantee);
            case "Personal":
                PersonalGuarantee personalGuarantee = personalGuaranteeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Guarantee not found with id: " + id));
                updatePersonalGuaranteeFields(personalGuarantee, (PersonalGuarantee) guarantee);
                return personalGuaranteeRepository.save(personalGuarantee);
            case "RealEstate":
                RealEstateGuarantee realEstateGuarantee = realEstateGuaranteeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Guarantee not found with id: " + id));
                updateRealEstateGuaranteeFields(realEstateGuarantee, (RealEstateGuarantee) guarantee);
                return realEstateGuaranteeRepository.save(realEstateGuarantee);
            case "Vehicle":
                VehicleGuarantee vehicleGuarantee = vehicleGuaranteeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Guarantee not found with id: " + id));
                updateVehicleGuaranteeFields(vehicleGuarantee, (VehicleGuarantee) guarantee);
                return vehicleGuaranteeRepository.save(vehicleGuarantee);
            default:
                throw new IllegalArgumentException("Invalid guarantee type: " + type);
        }
    }

    private void updateBusinessFundGuaranteeFields(BusinessFundGuarantee existingGuarantee,
            BusinessFundGuarantee newGuarantee) {
        existingGuarantee.setOwnerFullName(newGuarantee.getOwnerFullName());
        existingGuarantee.setCorporateName(newGuarantee.getCorporateName());
        existingGuarantee.setSocialCapital(newGuarantee.getSocialCapital());
        existingGuarantee.setCommerceRegistryNumber(newGuarantee.getCommerceRegistryNumber());
        existingGuarantee.setCommerceRegistryCity(newGuarantee.getCommerceRegistryCity());
        existingGuarantee.setManagerFullName(newGuarantee.getManagerFullName());
        existingGuarantee.setManagerNationalIDCard(newGuarantee.getManagerNationalIDCard());
        existingGuarantee.setTradeName(newGuarantee.getTradeName());
        existingGuarantee.setPledgeRank(newGuarantee.getPledgeRank());
        existingGuarantee.setPledgeRealizationDate(newGuarantee.getPledgeRealizationDate());
        existingGuarantee.setPledgeExpirationDate(newGuarantee.getPledgeExpirationDate());
    }

    private void updateMortgageGuaranteeFields(MortgageGuarantee existingGuarantee, MortgageGuarantee newGuarantee) {
        existingGuarantee.setOwnerFullName(newGuarantee.getOwnerFullName());
        existingGuarantee.setOwnerAddress(newGuarantee.getOwnerAddress());
        existingGuarantee.setNationalIDCardNumber(newGuarantee.getNationalIDCardNumber());
        existingGuarantee.setLandTitleName(newGuarantee.getLandTitleName());
        existingGuarantee.setLandTitleNumber(newGuarantee.getLandTitleNumber());
        existingGuarantee.setMortgageRank(newGuarantee.getMortgageRank());
        existingGuarantee.setLandRegistryOfficeName(newGuarantee.getLandRegistryOfficeName());
        existingGuarantee.setMortgageLoanAmount(newGuarantee.getMortgageLoanAmount());
        existingGuarantee.setMortgagedPropertyName(newGuarantee.getMortgagedPropertyName());
        existingGuarantee.setMortgagedPropertyArea(newGuarantee.getMortgagedPropertyArea());
        existingGuarantee.setConstructionsDescription(newGuarantee.getConstructionsDescription());
        existingGuarantee.setRegistrationDate(newGuarantee.getRegistrationDate());
        existingGuarantee.setMortgageStatus(newGuarantee.getMortgageStatus());
    }

    private void updatePersonalGuaranteeFields(PersonalGuarantee existingGuarantee, PersonalGuarantee newGuarantee) {
        existingGuarantee.setGuarantorLastName(newGuarantee.getGuarantorLastName());
        existingGuarantee.setGuarantorFirstName(newGuarantee.getGuarantorFirstName());
        existingGuarantee.setGuarantorPhoneNumber(newGuarantee.getGuarantorPhoneNumber());
        existingGuarantee.setGuarantorNationalID(newGuarantee.getGuarantorNationalID());
        existingGuarantee.setGuarantorIDExpirationDate(newGuarantee.getGuarantorIDExpirationDate());
        existingGuarantee.setRelationshipWithClient(newGuarantee.getRelationshipWithClient());
        existingGuarantee.setGuarantorResidenceAddress(newGuarantee.getGuarantorResidenceAddress());
        existingGuarantee.setGuarantorActivity(newGuarantee.getGuarantorActivity());
        existingGuarantee.setGuarantorMonthlyIncome(newGuarantee.getGuarantorMonthlyIncome());
        existingGuarantee.setGuarantorResidualIncome(newGuarantee.getGuarantorResidualIncome());
        existingGuarantee.setTotalOutstandingInstallments(newGuarantee.getTotalOutstandingInstallments());
        existingGuarantee.setActivitySeniority(newGuarantee.getActivitySeniority());
        existingGuarantee.setGuarantorEmployer(newGuarantee.getGuarantorEmployer());
        existingGuarantee.setGuarantorProfessionalAddress(newGuarantee.getGuarantorProfessionalAddress());
    }

    private void updateRealEstateGuaranteeFields(RealEstateGuarantee existingGuarantee,
            RealEstateGuarantee newGuarantee) {
        existingGuarantee.setOwnerLastName(newGuarantee.getOwnerLastName());
        existingGuarantee.setOwnerFirstName(newGuarantee.getOwnerFirstName());
        existingGuarantee.setOwnerAddress(newGuarantee.getOwnerAddress());
        existingGuarantee.setOwnerNationalID(newGuarantee.getOwnerNationalID());
        existingGuarantee.setLandTitleName(newGuarantee.getLandTitleName());
        existingGuarantee.setLandTitleNumber(newGuarantee.getLandTitleNumber());
        existingGuarantee.setPurchaseDeed(newGuarantee.getPurchaseDeed());
        existingGuarantee.setRank(newGuarantee.getRank());
        existingGuarantee.setLandRegistryName(newGuarantee.getLandRegistryName());
        existingGuarantee.setLoanAmount(newGuarantee.getLoanAmount());
        existingGuarantee.setPropertyName(newGuarantee.getPropertyName());
        existingGuarantee.setArea(newGuarantee.getArea());
        existingGuarantee.setConstructionDescription(newGuarantee.getConstructionDescription());
        existingGuarantee.setRegistrationDate(newGuarantee.getRegistrationDate());
    }

    private void updateVehicleGuaranteeFields(VehicleGuarantee existingGuarantee, VehicleGuarantee newGuarantee) {
        existingGuarantee.setVehicleBrand(newGuarantee.getVehicleBrand());
        existingGuarantee.setModelYear(newGuarantee.getModelYear());
        existingGuarantee.setRegistrationNumber(newGuarantee.getRegistrationNumber());
        existingGuarantee.setFuelType(newGuarantee.getFuelType());
        existingGuarantee.setFiscalHorsepower(newGuarantee.getFiscalHorsepower());
    }

    @Override
    public GuaranteesByTypeDTO getAllGuaranteesByCreditIdGroupedByType(Long creditId) {
        GuaranteesByTypeDTO guaranteesByTypeDTO = new GuaranteesByTypeDTO();
        guaranteesByTypeDTO.setBusinessFundGuarantees(businessFundGuaranteeRepository.findByCreditId(creditId));
        guaranteesByTypeDTO.setMortgageGuarantees(mortgageGuaranteeRepository.findByCreditId(creditId));
        guaranteesByTypeDTO.setPersonalGuarantees(personalGuaranteeRepository.findByCreditId(creditId));
        guaranteesByTypeDTO.setRealEstateGuarantees(realEstateGuaranteeRepository.findByCreditId(creditId));
        guaranteesByTypeDTO.setVehicleGuarantees(vehicleGuaranteeRepository.findByCreditId(creditId));
        return guaranteesByTypeDTO;
    }
}
