// com/recouvrex/process/chatbot/dto/ConversationDTO.java
package com.recouvrex.process.chatbot.dto;

import lombok.Data;
import java.util.List;

@Data
public class ConversationDTO {
    private Long sessionId;
    private String caseId;
    private String clientNom;
    private String clientPrenom;
    private String status;
    private String createdAt;
    private List<ChatMessageResponse> messages;
}