package com.recouvrex.process.controller;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.service.ThirdPartyService;
import com.recouvrex.process.utils.ThirdPartySpecifications;
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

@Tag(name = "ThirdParty", description = "ThirdParty management API")
// @CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api/thirdparty")
public class ThirdPartyController {
        @Autowired
        ThirdPartyService thirdPartyService;

        @Operation(summary = "Create a new ThirdParty", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @PostMapping("/")
        public ResponseEntity<ThirdParty> createThirdParty(@RequestBody ThirdParty thirdParty) {
                try {
                        ThirdParty thirdParty1 = thirdPartyService.createThirdParty(thirdParty);
                        return new ResponseEntity<>(thirdParty1, HttpStatus.CREATED);
                } catch (Exception e) {
                        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }

        @Operation(summary = "Get List of ThirdParty by userId", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @GetMapping("/getAllThirdParty")
        public ResponseEntity<List<ThirdParty>> getAllThirdPartyByUserId(
                        @RequestParam(value = "userId", required = false) Long userId) {
                try {

                        List<ThirdParty> thirdPartyList = thirdPartyService.getAllThirdPartyByUserId(userId);
                        return new ResponseEntity<>(thirdPartyList, HttpStatus.OK);
                } catch (Exception e) {
                        System.out.println(e.getMessage());
                        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

                }
        }

        @Operation(summary = "update a  thirdParty", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @PutMapping("/updateThirdParty")
        public ResponseEntity<ThirdParty> updateThirdParty(@RequestBody ThirdParty thirdParty) {
                try {
                        System.out.println("THIRDPARTYupdate : " + thirdParty.toString());
                        ThirdParty thirdParty1 = thirdPartyService.updateThirdParty(thirdParty);
                        return new ResponseEntity<>(thirdParty1, HttpStatus.OK);
                } catch (Exception e) {
                        System.out.println(e.getMessage());
                        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

                }
        }

        @Operation(summary = "Filter on ThirdParty", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @GetMapping("/filter/")
        public ResponseEntity<List<ThirdParty>> filterThirdParty(
                        @RequestParam(value = "userConnectedId") Long userConnectedId,
                        @RequestParam(value = "companyName", required = false) String companyName,
                        @RequestParam(value = "thirdPartyId", required = false) String thirdPartyId,
                        @RequestParam(value = "firstnameThird", required = false) String firstnameThird,
                        @RequestParam(value = "lastnameThird", required = false) String lastnameThird,
                        @RequestParam(value = "personalEmail", required = false) String personalEmail,
                        @RequestParam(value = "professionalEmail", required = false) String professionalEmail,
                        @RequestParam(value = "clientType", required = false) String clientType) {

                List<ThirdParty> thirdList = thirdPartyService.FilterThirdPartyMultiCriteria(userConnectedId,
                                thirdPartyId, firstnameThird, lastnameThird, personalEmail, professionalEmail,
                                clientType, companyName);
                return new ResponseEntity<>(thirdList, HttpStatus.OK);

        }

        @Operation(summary = "Filter on ThirdParty using one Arg", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @GetMapping("/filter/oneArg")
        public ResponseEntity<List<ThirdParty>> filterThirdPartyUsingOneArg(
                        @RequestParam(value = "userConnectedId") Long userConnectedId,
                        @RequestParam(value = "searchKeyWord", required = false) String searchKeyWord) {

                List<ThirdParty> thirdList = thirdPartyService.filterThirdPartyUsingOneArg(userConnectedId,
                                searchKeyWord);
                return new ResponseEntity<>(thirdList, HttpStatus.OK);

        }


        @Operation(summary = "Create multiple third parties", description = "Create multiple third party records in bulk", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                        @ApiResponse(responseCode = "201", description = "Third parties created successfully", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = ThirdParty.class)) }),
                        @ApiResponse(responseCode = "500", description = "Internal server error", content = {
                                        @Content(mediaType = "application/json") })
        })
        @PostMapping("/multiple")
        public ResponseEntity<List<ThirdParty>> createMultipleThirdParties(@RequestBody List<ThirdParty> thirdParties) {
                try {
                        List<ThirdParty> createdThirdParties = thirdPartyService
                                        .createMultipleThirdParties(thirdParties);
                        return ResponseEntity.status(HttpStatus.CREATED).body(createdThirdParties);
                } catch (Exception e) {
                        System.out.println("\nException\n"+ e);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
        }


        @Operation(summary = "count nbr of ThirdParty by userId", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
        @ApiResponses({
                @ApiResponse(responseCode = "201", content = {
                        @Content(schema = @Schema(implementation = ThirdParty.class), mediaType = "application/json") }),
                @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
        @GetMapping("/countNbrThirdParty")
        public ResponseEntity<Long> countNbrThirdPartyByUser(
                @RequestParam(value = "userId", required = false) Long userId) {
                try {

                        Long nbrThird = thirdPartyService.countNbrThirdPartyByUser(userId);
                        return new ResponseEntity<>(nbrThird, HttpStatus.OK);
                } catch (Exception e) {
                        System.out.println(e.getMessage());
                        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

                }
        }
}
