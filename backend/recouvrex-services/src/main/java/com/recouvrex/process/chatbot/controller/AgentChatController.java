package com.recouvrex.process.chatbot.controller;

import com.recouvrex.process.chatbot.dto.ChatMessageRequest;
import com.recouvrex.process.chatbot.dto.ChatMessageResponse;
import com.recouvrex.process.chatbot.dto.ConversationDTO;
import com.recouvrex.process.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class AgentChatController {

    private final ChatService chatService;

    // Toutes les conversations (onglet agent)
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDTO>> getAllConversations(
              @RequestParam(required = false) Long userId) {
        try {
              return ResponseEntity.ok(chatService.getAllConversations(userId));
      } catch (Exception e) {
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
     }
   }

    // Détail d'une conversation
    @GetMapping("/conversations/{sessionId}")
    public ResponseEntity<ConversationDTO> getConversation(
            @PathVariable Long sessionId) {
        try {
            return ResponseEntity.ok(chatService.getConversation(sessionId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // L'agent intervient dans la conversation
    @PostMapping("/conversations/{sessionId}/intervene")
    public ResponseEntity<?> agentIntervene(
            @PathVariable Long sessionId,
            @RequestBody ChatMessageRequest request) {
        try {
            ChatMessageResponse response = chatService.agentIntervene(sessionId, request.getMessage());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
        }
    }

    // Télécharger le PDF de résumé
    @GetMapping("/conversations/{sessionId}/pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long sessionId) {
        try {
             byte[] pdf = chatService.generateConversationPdf(sessionId);
             return ResponseEntity.ok()
                  .header("Content-Type", "application/pdf")
                  .header("Content-Disposition",
                      "attachment; filename=conversation_" + sessionId + ".pdf")
                  .body(pdf);
       } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
   }
}