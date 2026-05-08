// package com.recouvrex.process.chatbot.dto.ChatMessageResponse.java
package com.recouvrex.process.chatbot.dto;

import lombok.Data;

@Data
public class ChatMessageResponse {
    private String sender;   // AI, AGENT
    private String message;
    private String timestamp;
}