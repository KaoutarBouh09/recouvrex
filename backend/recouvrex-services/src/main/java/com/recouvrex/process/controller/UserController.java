package com.recouvrex.process.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.recouvrex.process.model.User;
import com.recouvrex.process.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.recouvrex.process.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "User management APIs")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private Cloudinary cloudinary;

    @Value("${cloudinary.folder}")
    private String folder;

    @Operation(summary = "Create a new User", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Update an existing User by ID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            if (updatedUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  

    @Operation(summary = "Get User by userName", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @GetMapping("/username/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable("userName") String userName) {
        try {
            User user = userService.getUserByUserName(userName);
            // if (user == null) {
            //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            // }//because I want to just return null if the user not found so the front will now its not found and will 
            //do an other call to create the user
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get User by ID", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        System.out.println("\n\nid");
        System.out.println(id);
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/photo/{userId}")
    public ResponseEntity<?> uploadImage(@PathVariable("userId") Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", folder));

            // Extract the URL of the uploaded image from the Cloudinary response
            String imageUrl = (String) result.get("url");

            // Update the user's photo URL in your database
            userService.updateUserPhoto(userId, imageUrl);

            return ResponseEntity.ok().body(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }


    @Operation(summary = "Get List of Users ", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsersByManagerId(
            @RequestParam(value = "managerId", required = false) Long managerId) {
        try {

            List<User> usersList = userService.findByManager(managerId);
            return new ResponseEntity<>(usersList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Get nbr case for User ", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/nbrCaseForUser")
    public ResponseEntity<Long> countCaseByUser(
            @RequestParam(value = "userId", required = false) Long userId) {
        try {

            Long usersList = userService.countCaseByUser(userId);
            return new ResponseEntity<>(usersList, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "Filter Users using one Arg", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/filter/oneArg")
    public ResponseEntity<List<User>> filterUsersUsingOneArg(
            @RequestParam(value = "userConnectedId") Long userConnectedId,
            @RequestParam(value = "searchKeyWord", required = false) String searchKeyWord) {

        List<User> usersList = userService.filterUsersUsingOneArg(userConnectedId,
                searchKeyWord);
        return new ResponseEntity<>(usersList, HttpStatus.OK);

    }
    @Operation(summary = "Filter Users using MultiCriteria", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/filter/multiCriteria")
    public ResponseEntity<List<User>> filterUsersUsingMultiCriteria(
            @RequestParam(value = "userConnectedId") Long userConnectedId,
            @RequestParam(value = "userId", required = false) String userId ,
            @RequestParam(value = "firstname", required = false) String firstname,
            @RequestParam(value = "lastname", required = false) String lastname) {

        List<User> usersList = userService.FilterUsersByMultiCriteria(userConnectedId,
                userId,firstname,lastname);
        return new ResponseEntity<>(usersList, HttpStatus.OK);

    }


    @Operation(summary = "Get all Users", security = @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all users", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.findAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
