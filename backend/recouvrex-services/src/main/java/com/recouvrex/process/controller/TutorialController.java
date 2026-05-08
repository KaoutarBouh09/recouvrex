package com.recouvrex.process.controller;

import java.util.List;
import java.util.UUID;

import com.recouvrex.process.model.Tutorial;
import com.recouvrex.process.model.enums.FollowingActionEnum;
import com.recouvrex.process.service.TutorialService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@Tag(name = "Tutorials", description = "Tutorial management APIs")
//@CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api")
public class TutorialController {

	@Autowired
	TutorialService tutorialService;


	@Operation(summary = "Create a new Tutorial"
	, security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
					@ApiResponse(responseCode = "201", content = {
									@Content(schema = @Schema(implementation = Tutorial.class), mediaType = "application/json") }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PostMapping("/tutorials")
	public ResponseEntity<Tutorial> createTutorial(@RequestBody Tutorial tutorial) {
		try {
			Tutorial _tutorial = tutorialService.save(tutorial);

			return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
		} catch (Exception e) {
			//e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/test")
	@Operation(summary = "Retrieve all Tutorials"
			, security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	public ResponseEntity<String> createTutorial() {
		UUID uuid = UUID.randomUUID();
		String uuidAsString = uuid.toString();


		return new ResponseEntity<>("Hello", HttpStatus.CREATED);

	}

	@Operation(summary = "Retrieve all Tutorials"
	, security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
					@ApiResponse(responseCode = "200", content = {
									@Content(schema = @Schema(implementation = Tutorial.class), mediaType = "application/json") }),
					@ApiResponse(responseCode = "204", description = "There are no Tutorials", content = {
									@Content(schema = @Schema()) }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/tutorials")
	public ResponseEntity<List<Tutorial>> getAllTutorials(@RequestParam(required = false) String title) {
			return new ResponseEntity<>(tutorialService.findAll(), HttpStatus.OK);
	}

	@Operation(
					summary = "Retrieve a Tutorial by Id",
					description = "Get a Tutorial object by specifying its id. The response is Tutorial object with id, title, description and published status.",
			        security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
					@ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Tutorial.class), mediaType = "application/json") }),
					@ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/tutorials/{id}")
	public ResponseEntity<Tutorial> getTutorialById(@PathVariable("id") long id) {
		Tutorial tutorial = tutorialService.findById(id).orElse(null);

		if (tutorial != null) {
			return new ResponseEntity<>(tutorial, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Operation(summary = "Update a Tutorial by Id"
	,security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
					@ApiResponse(responseCode = "200", content = {
									@Content(schema = @Schema(implementation = Tutorial.class), mediaType = "application/json") }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }),
					@ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }) })
	@PutMapping("/tutorials/{id}")
	public ResponseEntity<Tutorial> updateTutorial(@PathVariable("id") long id, @RequestBody Tutorial tutorial) {
			return new ResponseEntity<>(tutorialService.save(tutorial), HttpStatus.OK);
	}

	@Operation(summary = "Delete a Tutorial by Id",
			security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({ @ApiResponse(responseCode = "204", content = { @Content(schema = @Schema()) }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@DeleteMapping("/tutorials/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
		try {
			tutorialService.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Delete all Tutorials"
	, security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({ @ApiResponse(responseCode = "204", content = { @Content(schema = @Schema()) }),
					@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@DeleteMapping("/tutorials")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			tutorialService.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Operation(summary = "Retrieve all published Tutorials"
			,security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({ @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema()) }),
			 @ApiResponse(responseCode = "204", content = { @Content(schema = @Schema()) }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/tutorials/published/{isPublished}")
	public ResponseEntity<List<Tutorial>> findByPublished(@PathVariable boolean isPublished) {
		try {
			List<Tutorial> tutorials = tutorialService.findByPublished(isPublished);

			if (CollectionUtil.isEmpty(tutorials)) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(tutorials, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
