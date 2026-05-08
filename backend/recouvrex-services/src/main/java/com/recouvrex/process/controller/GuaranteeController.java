package com.recouvrex.process.controller;

import com.recouvrex.process.model.guarantee.BusinessFundGuarantee;
import com.recouvrex.process.model.guarantee.Guarantee;
import com.recouvrex.process.model.guarantee.GuaranteesByTypeDTO;
import com.recouvrex.process.model.guarantee.MortgageGuarantee;
import com.recouvrex.process.model.guarantee.PersonalGuarantee;
import com.recouvrex.process.model.guarantee.RealEstateGuarantee;
import com.recouvrex.process.model.guarantee.VehicleGuarantee;
import com.recouvrex.process.service.GuaranteeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@Tag(name = "Guarantee", description = "Guarantee management APIs")
@RestController
@RequestMapping("/api/guarantees")
public class GuaranteeController {

    @Autowired
    private GuaranteeService guaranteeService;

    @Operation(summary = "Create a new Vehicle Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "201", description = "Guarantee created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PostMapping("/type_vehicle")
    public ResponseEntity<Guarantee> createGuarantee(@RequestBody VehicleGuarantee guarantee) {
        Guarantee createdGuarantee = guaranteeService.createGuarantee(guarantee, "Vehicle");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuarantee);
    }

    @Operation(summary = "Update an existing Vehicle Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "Guarantee updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PutMapping("/type_vehicle/{id}")
    public ResponseEntity<Guarantee> updateVehicleGuarantee(@PathVariable Long id,
            @RequestBody VehicleGuarantee guarantee) {
        Guarantee updatedGuarantee = guaranteeService.updateGuarantee(id, guarantee, "Vehicle");
        return ResponseEntity.ok(updatedGuarantee);
    }

    @Operation(summary = "Create a new Business Fund Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "201", description = "Business Fund Guarantee created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PostMapping("/type_business_fund")
    public ResponseEntity<Guarantee> createBusinessFundGuarantee(@RequestBody BusinessFundGuarantee guarantee) {
        Guarantee createdGuarantee = guaranteeService.createGuarantee(guarantee, "BusinessFund");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuarantee);
    }

    @Operation(summary = "Update an existing Business Fund Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "Guarantee updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PutMapping("/type_business_fund/{id}")
    public ResponseEntity<Guarantee> updateBusinessFundGuarantee(@PathVariable Long id,
            @RequestBody BusinessFundGuarantee guarantee) {
        Guarantee updatedGuarantee = guaranteeService.updateGuarantee(id, guarantee, "BusinessFund");
        return ResponseEntity.ok(updatedGuarantee);
    }

    @Operation(summary = "Create a new Mortgage Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "201", description = "Mortgage Guarantee created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PostMapping("/type_mortgage")
    public ResponseEntity<Guarantee> createMortgageGuarantee(@RequestBody MortgageGuarantee guarantee) {
        Guarantee createdGuarantee = guaranteeService.createGuarantee(guarantee, "Mortgage");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuarantee);
    }

    @Operation(summary = "Update an existing Mortgage Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "Guarantee updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PutMapping("/type_mortgage/{id}")
    public ResponseEntity<Guarantee> updateMortgageGuarantee(@PathVariable Long id,
            @RequestBody MortgageGuarantee guarantee) {
        Guarantee updatedGuarantee = guaranteeService.updateGuarantee(id, guarantee, "Mortgage");
        return ResponseEntity.ok(updatedGuarantee);
    }

    @Operation(summary = "Create a new Personal Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "201", description = "Personal Guarantee created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PostMapping("/type_personal")
    public ResponseEntity<Guarantee> createPersonalGuarantee(@RequestBody PersonalGuarantee guarantee) {
        Guarantee createdGuarantee = guaranteeService.createGuarantee(guarantee, "Personal");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuarantee);
    }

    @Operation(summary = "Update an existing Personal Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "Guarantee updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PutMapping("/type_personal/{id}")
    public ResponseEntity<Guarantee> updatePersonalGuarantee(@PathVariable Long id,
            @RequestBody PersonalGuarantee guarantee) {
        Guarantee updatedGuarantee = guaranteeService.updateGuarantee(id, guarantee, "Personal");
        return ResponseEntity.ok(updatedGuarantee);
    }

    @Operation(summary = "Create a new Real Estate Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "201", description = "Real Estate Guarantee created successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PostMapping("/type_real_estate")
    public ResponseEntity<Guarantee> createRealEstateGuarantee(@RequestBody RealEstateGuarantee guarantee) {
        Guarantee createdGuarantee = guaranteeService.createGuarantee(guarantee, "RealEstate");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGuarantee);
    }

    @Operation(summary = "Update an existing Real Estate Guarantee", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "Guarantee updated successfully", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @PutMapping("/type_real_estate/{id}")
    public ResponseEntity<Guarantee> updateRealEstateGuarantee(@PathVariable Long id,
            @RequestBody RealEstateGuarantee guarantee) {
        Guarantee updatedGuarantee = guaranteeService.updateGuarantee(id, guarantee, "RealEstate");
        return ResponseEntity.ok(updatedGuarantee);
    }

    @Operation(summary = "Get all Guarantees by Credit ID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponse(responseCode = "200", description = "List of Guarantees", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = Guarantee.class))
    })
    @GetMapping("/byCredit/{creditId}")
    public ResponseEntity<GuaranteesByTypeDTO> getAllGuaranteesByCreditIdGroupedByType(@PathVariable Long creditId) {
        GuaranteesByTypeDTO guaranteesByTypeDTO = guaranteeService.getAllGuaranteesByCreditIdGroupedByType(creditId);
        System.out.println("\n\n\nguaranteesByTypeDTO");
        System.out.println(guaranteesByTypeDTO);
        return ResponseEntity.ok(guaranteesByTypeDTO);
    }

}
