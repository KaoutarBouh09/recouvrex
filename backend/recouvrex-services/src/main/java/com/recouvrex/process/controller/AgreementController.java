package com.recouvrex.process.controller;

import com.recouvrex.process.model.Agreement;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Credit;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.service.AgreementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@Tag(name = "Agreement", description = "Agreement management API")
//@CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api/agreement")
public class AgreementController {

    @Autowired
    AgreementService agreementService;


    @Operation(summary = "Create a new Agreement"
            , security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Agreement.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PostMapping("/")
    public ResponseEntity<Agreement> createAgreement(@RequestBody Agreement agreement) {
        try {
            Agreement agreement1 = agreementService.create(agreement);
            return new ResponseEntity<>(agreement1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "Get List of Agreements "
            , security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Agreement.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getAgreements")
    public ResponseEntity<List<Agreement>> getAgreement(@RequestParam(value = "managerId") Long managerId ,@RequestParam(value = "caseId" , required = false ) Long caseId,@RequestParam(value = "agreementStatus" , required = false)AgreementStatusTypesEnum agreementStatus) {
        try {

            List<Agreement> agreementList = agreementService.getAgreements(managerId,caseId,agreementStatus);
            return new ResponseEntity<>(agreementList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @Operation(summary = "update a  Agreement "
            , security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Agreement.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/updateAgreement")
    public ResponseEntity<Agreement> updateAgreement(@RequestBody Agreement agreement) {
        try {
            System.out.println("AgreementUpdate : "+agreement.toString());
            Agreement agreement1 = agreementService.updateAgreement(agreement);
            return new ResponseEntity<>(agreement1, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


}
