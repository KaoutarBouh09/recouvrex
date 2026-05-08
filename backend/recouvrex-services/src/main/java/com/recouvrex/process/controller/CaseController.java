package com.recouvrex.process.controller;

import com.recouvrex.process.model.*;
import com.recouvrex.process.model.enums.FollowingActionEnum;
import com.recouvrex.process.model.enums.ProcessingActionEnum;
import com.recouvrex.process.model.enums.UserStatusEnum;
import com.recouvrex.process.service.CaseService;
import com.recouvrex.process.service.TutorialService;
import com.recouvrex.process.utils.IdentificationTool;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.impl.util.CollectionUtil;
import org.camunda.bpm.engine.runtime.Execution;
import org.camunda.bpm.engine.runtime.ProcessInstanceWithVariables;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@Tag(name = "Case", description = "Case management API")
// @CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api/case")
public class CaseController {

	@Autowired
	CaseService caseService;

	@Operation(summary = "Create a new case", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PostMapping("/")
	public ResponseEntity<Case> createCase(@RequestBody Case cas) {
		try {
			Case _case = caseService.createCase(cas);
			return new ResponseEntity<>(_case, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "follow case", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PutMapping("/follow/{caseId}/followingAction/{followingAction}/status/{status}")
	public ResponseEntity<Case> decideOnAction(@PathVariable("caseId") String caseId,
			@PathVariable("followingAction") FollowingActionEnum followingAction,
			@PathVariable("status") Long statusId) {
		Case _case = caseService.decideOnAction(caseId, followingAction, statusId);
		return new ResponseEntity<>(_case, HttpStatus.OK);
	}

	@Operation(summary = "process the collect action", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PutMapping("/processAction/{caseId}/ProcessingAction/{processingAction}/status/{status}")
	public ResponseEntity<Case> processCollectAction(@PathVariable("caseId") String caseId,
			@PathVariable("processingAction") ProcessingActionEnum processingAction,
			@PathVariable("status") Long statusId) {
		Case _case = caseService.processCollectAction(caseId, processingAction, statusId);
		return new ResponseEntity<>(_case, HttpStatus.OK);
	}

	@Operation(summary = "decide on procedure", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PutMapping("/decideOnProcedure/{caseId}/procedureId/{procedureId}/status/{status}/processingAction/{processingAction}")
	public ResponseEntity<Case> decideOnProcedure(@PathVariable("caseId") String caseId,
			@PathVariable("procedureId") Long procedureId,
			@PathVariable("status") Long statusId,
			@PathVariable("processingAction") ProcessingActionEnum processingAction) {
		Case _case = caseService.processCollectAction(caseId, procedureId, statusId, processingAction);
		return new ResponseEntity<>(_case, HttpStatus.OK);
	}

	@Operation(summary = "Filter on cases", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/filter/")
	public ResponseEntity<List<Case>> filterCase(
			@RequestParam(value = "userConnectedId") Long userConnectedId,
			@RequestParam(value = "caseId", required = false) String caseId,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "firstnameThird", required = false) String firstnameThird,
			@RequestParam(value = "lastnameThird", required = false) String lastnameThird,
			@RequestParam(value = "firstnameUser", required = false) String firstnameUser,
			@RequestParam(value = "lastnameUser", required = false) String lastnameUser,
			@RequestParam(value = "contractId", required = false) String contractId,
			@RequestParam(value = "userStatus", required = false) UserStatusEnum userStatus) {

		List<Case> caseList = caseService.filterCase(userConnectedId, caseId, firstnameThird, lastnameThird,
				firstnameUser, lastnameUser, contractId, status,userStatus);
		return new ResponseEntity<>(caseList, HttpStatus.OK);

	}

	@Operation(summary = "Filter on cases", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@GetMapping("/filterOne/")
	public ResponseEntity<List<Case>> filterCaseOneString(
			@RequestParam(value = "userConnectedId") Long userConnectedId,
			@RequestParam(value = "searchText", required = false) String searchText,
			@RequestParam(value = "statusId", required = false) Long statusId) {

		List<Case> caseList = caseService.filterCaseOneCriteria(userConnectedId, statusId, searchText);
		return new ResponseEntity<>(caseList, HttpStatus.OK);

	}

	@Operation(summary = "Filter on cases", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/filter/{userId}")
	public ResponseEntity<List<Case>> filterCaseByUserId(@PathVariable("userId") Long userId) {
		List<Case> caseList = caseService.filterCaseByUserId(userId);
		System.out.println(userId);
		return new ResponseEntity<>(caseList, HttpStatus.OK);
	}

	@Operation(summary = "Create multiple cases", description = "Create multiple case records in bulk", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "Cases created successfully", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = Case.class)) }),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = {
					@Content(mediaType = "application/json") })
	})
	@PostMapping("/multiple")
	public ResponseEntity<List<Case>> createMultipleCases(@RequestBody List<Case> cases) {
		try {
			List<Case> createdCases = caseService.createMultipleCases(cases);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdCases);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

    @Operation(summary = "update a  case userId", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/updateCaseUserId")
    public ResponseEntity<Void> updateCaseUserId(@RequestParam("cases") List<Long> cases ,@RequestParam("userId") Long userId  ) {
        try {
                caseService.updateCaseUserId(cases,userId);
            return new ResponseEntity<>(null,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

	@Operation(summary = "Get number of cases for user", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/count/{userId}")
	public ResponseEntity<Long> GetNumberOfCasesForUser(@PathVariable("userId") Long userId) {
		Long  nbrCases = caseService.numberOfCasesForUser(userId);
		System.out.println(userId);
		return new ResponseEntity<>(nbrCases, HttpStatus.OK);
	}

	@Operation(summary = " Get case AmountTotal By Status", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/caseAmountTotalByStatus")
	public ResponseEntity<Long> caseAmountTotalByStatus(@RequestParam("status") String status ,@RequestParam("userId") Long userId) {
		Long  totalAmount = caseService.caseAmountTotalByStatus(status,userId);
		System.out.println("totalAmount :"+totalAmount);
		return new ResponseEntity<>(totalAmount, HttpStatus.OK);
	}

	@Operation(summary = "Get all cases ordered by ID in descending order", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
        @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
        @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @GetMapping("/all/orderByIdDesc")
    public ResponseEntity<List<Case>> getAllCasesOrderedByIdDesc() {
        try {
            List<Case> cases = caseService.findAllByOrderByIdDesc();
            return new ResponseEntity<>(cases, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


	@Operation(summary = "Filter on cases for Admin", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Case.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/filterForAdmin/")
	public ResponseEntity<List<Case>> FilterCasesWithCriteriaForAdmin(
			@RequestParam(value = "caseId", required = false) String caseId,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "firstnameThird", required = false) String firstnameThird,
			@RequestParam(value = "lastnameThird", required = false) String lastnameThird,
			@RequestParam(value = "firstnameUser", required = false) String firstnameUser,
			@RequestParam(value = "lastnameUser", required = false) String lastnameUser,
			@RequestParam(value = "contractId", required = false) String contractId,
			@RequestParam(value = "userStatus", required = false) UserStatusEnum userStatus) {

		List<Case> caseList = caseService.FilterWithCriteriaForAdmin( caseId, firstnameThird, lastnameThird,
				firstnameUser, lastnameUser, contractId, status,userStatus);
		return new ResponseEntity<>(caseList, HttpStatus.OK);

	}

	@Operation(summary = "Filter on cases", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@GetMapping("/filterOneArgForAdmin/")
	public ResponseEntity<List<Case>> filterOneArgForAdmin(
			@RequestParam(value = "searchText", required = false) String searchText,
			@RequestParam(value = "statusId", required = false) Long statusId) {

		List<Case> caseList = caseService.filterCaseOneCriteriaForAdmin(statusId, searchText);
		return new ResponseEntity<>(caseList, HttpStatus.OK);

	}

}
