// package com.recouvrex.process.chatbot.dto.ChatMessageRequest.java
package com.recouvrex.process.chatbot.dto;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private String token;
    private String pinCode;
    private String message;
}