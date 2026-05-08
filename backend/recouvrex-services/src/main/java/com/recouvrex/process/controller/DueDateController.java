package com.recouvrex.process.controller;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.service.DueDateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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

import java.time.LocalDate;
import java.util.List;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@Tag(name = "DueDate", description = "DueDate management API")
// @CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api/dueDate")
public class DueDateController {
    @Autowired
    DueDateService dueDateService;

    @Operation(summary = "Create a new DueDate", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PostMapping("/")
    public ResponseEntity<DueDate> createDueDate(@RequestBody DueDate dueDate) {
        try {
            System.out.println("DUEDATEss : " + dueDate.toString());
            DueDate _dueDate = dueDateService.createDueDate(dueDate);
            return new ResponseEntity<>(_dueDate, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Get List of DueDates by CaseID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getDueDates")
    public ResponseEntity<List<DueDate>> findDueDateByCaseId(
            @RequestParam(value = "caseId", required = false) Long caseId) {
        try {

            List<DueDate> dueDateList = dueDateService.findDueDateByCaseId(caseId);
            return new ResponseEntity<>(dueDateList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Get List of DueDates by creditId", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getDueDatesByCredit")
    public ResponseEntity<List<DueDate>> findDueDateByCreditId(
            @RequestParam(value = "creditId", required = false) Long creditId) {
        try {

            List<DueDate> dueDateList = dueDateService.findDueDateByCreditId(creditId);
            return new ResponseEntity<>(dueDateList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "update a  DueDate", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/updateDueDate")
    public ResponseEntity<DueDate> updateDueDate(@RequestBody DueDate dueDate) {
        try {
            System.out.println("DUEDATEupdate : " + dueDate.toString());
            DueDate _dueDate = dueDateService.updateDueDate(dueDate);
            return new ResponseEntity<>(_dueDate, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @Operation(summary = "update a  updateExpectedPaymentDate"
            , security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/updateExpectedPaymentDate")
    public ResponseEntity<DueDate> updateExpectedPaymentDateDue(@RequestParam(value = "dueDateId") Long dueDateId,
                                                                @RequestParam(value = "expectedPaymentDate") LocalDate expectedPaymentDate) {
        try {
            DueDate _dueDate = dueDateService.updateExpectedPaymentDateDue(dueDateId,expectedPaymentDate);
            return new ResponseEntity<>(_dueDate, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Delete a DueDate by Id",
            security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({ @ApiResponse(responseCode = "204", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @DeleteMapping("/deleteDueDate/{id}")
    public ResponseEntity<HttpStatus> deleteDueDate(@PathVariable("id") long id) {
        try {
            System.out.println("this is id : " + id);
            dueDateService.deleteDueDate(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get One  DueDate by CaseID AND dueDateId ", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getDueDateInfo")
    public ResponseEntity<DueDate> findDueDateByCaseIdAndDueDateId(@RequestParam(value = "caseId") Long caseId,
            @RequestParam(value = "dueDateId") String dueDateId) {
        try {
            DueDate dueDateList = dueDateService.findDueDateByCaseIdAndDueDateId(dueDateId, caseId);
            return new ResponseEntity<>(dueDateList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Get   DueDates by ID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = DueDate.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getDueDateById")
    public ResponseEntity<DueDate> findDueDateById(
            @RequestParam(value = "dueDateId", required = false) Long dueDateId) {
        try {

            DueDate dueDate = dueDateService.findDueDateById(dueDateId);
            return new ResponseEntity<>(dueDate, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Create Multiple DueDates", description = "Create multiple due date records in bulk", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "DueDates created successfully", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = DueDate.class))) }),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = {
                    @Content(mediaType = "application/json") })
    })
    @PostMapping("/multiple")
    public ResponseEntity<List<DueDate>> createMultipleDueDates(@RequestBody List<DueDate> dueDates) {
        try {
            List<DueDate> createdDueDates = dueDateService.createMultipleDueDates(dueDates);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDueDates);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
