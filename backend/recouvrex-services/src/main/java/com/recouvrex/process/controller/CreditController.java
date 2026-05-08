package com.recouvrex.process.controller;

import com.recouvrex.process.model.Credit;
import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.service.CreditService;
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

@Tag(name = "Credit", description = "Credit management API")
// @CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api/credit")
public class CreditController {

    @Autowired
    CreditService creditService;

    @Operation(summary = "Create a new credit", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Credit.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PostMapping("/")
    public ResponseEntity<Credit> createCredit(@RequestBody Credit credit) {
        try {
            Credit credit1 = creditService.createCredit(credit);
            return new ResponseEntity<>(credit1, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Get List of Credits ", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Credit.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getCredits")
    public ResponseEntity<List<Credit>> getCredits(
            @RequestParam(value = "thirdPartyId", required = false) Long thirdPartyId) {
        try {

            List<Credit> creditsList = creditService.getCredits(thirdPartyId);
            return new ResponseEntity<>(creditsList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "update a  credit", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Credit.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/updateCredit")
    public ResponseEntity<Credit> updateCredit(@RequestBody Credit credit) {
        try {
            System.out.println("CreditUpdate : " + credit.toString());
            Credit credit1 = creditService.updateCredit(credit);
            return new ResponseEntity<>(credit, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Create multiple credits", description = "Create multiple credit records in bulk", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Credits created successfully", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Credit.class)) }),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = {
                    @Content(mediaType = "application/json") })
    })
    @PostMapping("/multiple")
    public ResponseEntity<List<Credit>> createMultipleCredits(@RequestBody List<Credit> credits) {
        try {
            List<Credit> createdCredits = creditService.createMultipleCredits(credits);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCredits);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
