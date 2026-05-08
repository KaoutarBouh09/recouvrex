/*
package com.recouvrex.process.controller.smsNotifications;


import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
@Tag(name = "NotificationSMS", description = "NotificationSMS management API")
@RestController
@RequestMapping("/notification")
public class SmsController {


    @Value("${spring.twilio.account-sid}")
    private String accountSID;

    @Value("${spring.twilio.auth-token}")
    private String authToken;

    @Value("${spring.twilio.from-number}")
    private String fromNumber;

    @GetMapping(value = "/sendSMS")
    public ResponseEntity<String> sendSMS() {


          String toNumber = "+212650380177";
          String messageText="FROM RECOUVREX APP ? YOU HAVE TO PAID 220$  ";

        Twilio.init(accountSID,authToken);

        Message.creator(new PhoneNumber(toNumber),
                new PhoneNumber(fromNumber), "Hello from Twilio  📞"+messageText).create();

        return new ResponseEntity<String>("Message sent successfully", HttpStatus.OK);
    }
}
*/
