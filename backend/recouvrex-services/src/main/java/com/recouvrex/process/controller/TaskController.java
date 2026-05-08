package com.recouvrex.process.controller;

import com.recouvrex.process.model.Task;
import com.recouvrex.process.model.Tutorial;
import com.recouvrex.process.service.TaskService;
import com.recouvrex.process.service.TutorialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.camunda.bpm.engine.impl.util.CollectionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@Tag(name = "Task", description = "Tutorial management APIs")
// @CrossOrigin(origins = "http://localhost:8089")
@RestController
@RequestMapping("/api")
public class TaskController {

	@Autowired
	TaskService taskService;

	@Operation(summary = "Create a new Task", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "201", content = {
					@Content(schema = @Schema(implementation = Task.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@PostMapping("/Task")
	public ResponseEntity<Task> createTask(@RequestBody Task task, Long caseId) {
		try {

			Task _task = taskService.save(task, caseId);

			return new ResponseEntity<>(_task, HttpStatus.CREATED);
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Retrieve all Task by caseId", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "200", content = {
					@Content(schema = @Schema(implementation = Task.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "204", description = "There are no Task this caseId", content = {
					@Content(schema = @Schema()) }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/task/{caseId}")
	public ResponseEntity<List<Task>> getTaskByCaseId(@PathVariable("caseId") Long CaseId) {
		return new ResponseEntity<>(taskService.findByCaseId(CaseId), HttpStatus.OK);
	}

	@Operation(summary = "Delete Tasks by IDs", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "200", content = { @Content(schema = @Schema()) }),
			@ApiResponse(responseCode = "404", description = "Tasks not found", content = {
					@Content(schema = @Schema()) }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
	})
	@DeleteMapping("/tasks")
	public ResponseEntity<HttpStatus> deleteTasksByIds(@RequestBody List<Long> ids) {
		try {
			System.out.println("\n\n\n\n\nids");
			System.out.println(ids);
			boolean deleted = taskService.deleteTasksByIds(ids);
			if (!deleted) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "Update an existing Task by ID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Task updated successfully", content = {
					@Content(schema = @Schema(implementation = Task.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "404", description = "Task not found"),
			@ApiResponse(responseCode = "500", description = "Internal server error")
	})
	@PutMapping("/task/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable("id") Long id, @RequestBody Task taskDetails) {
		try {
			Task updatedTask = taskService.update(id, taskDetails);
			if (updatedTask == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(updatedTask, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@Operation(summary = "Retrieve new  Tasks by owner id ", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
	@ApiResponses({
			@ApiResponse(responseCode = "200", content = {
					@Content(schema = @Schema(implementation = Task.class), mediaType = "application/json") }),
			@ApiResponse(responseCode = "204", description = "There are no Task this userId", content = {
					@Content(schema = @Schema()) }),
			@ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
	@GetMapping("/task/newTasks")
	public ResponseEntity<List<Task>> getNewTasksByUserId(@RequestParam("userId") Long userId) {
		return new ResponseEntity<>(taskService.findNewTasksByUserId(userId), HttpStatus.OK);
	}


}
