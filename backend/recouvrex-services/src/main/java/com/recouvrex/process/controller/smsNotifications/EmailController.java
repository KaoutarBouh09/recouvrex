package com.recouvrex.process.controller.smsNotifications;

import com.recouvrex.process.service.EmailService;
import com.recouvrex.process.service.impl.EmailServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "NotificationEmail", description = "NotificationEmail management API")
@RestController
@RequestMapping("/api/notification")
public class EmailController {

    @Autowired
    EmailService emailService;
    @PostMapping(value = "/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestParam(value = "to") String to,
                                            @RequestParam(value = "subject", required = false) String subject,
                                            @RequestParam(value = "body", required = false) String body) {
        try {
            emailService.sendEmail(to, subject, body);
            return new ResponseEntity<>("Message sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it as needed
            return new ResponseEntity<>("Failed to send email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
