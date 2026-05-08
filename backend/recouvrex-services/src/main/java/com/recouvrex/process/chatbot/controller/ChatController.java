package com.recouvrex.process.chatbot.controller;

import com.recouvrex.process.chatbot.dto.ChatMessageRequest;
import com.recouvrex.process.chatbot.dto.ChatMessageResponse;
import com.recouvrex.process.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // Valider token + PIN → accès au chat
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token,
                                      @RequestParam String pinCode) {
        try {
            chatService.validateAccess(token, pinCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(e.getMessage());
        }
    }

    // Envoyer un message et recevoir la réponse AI
    @PostMapping("/message")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessageRequest request) {
        try {
            ChatMessageResponse response = chatService.sendMessage(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
        }
    }

    // Clôturer la conversation
    @PostMapping("/close")
    public ResponseEntity<?> closeSession(@RequestParam String token,
                                          @RequestParam String pinCode) {
        try {
            chatService.closeSession(token, pinCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
        }
    }

    // ✅ AJOUT : récupérer tous les messages de la session (polling client)
    @GetMapping("/messages")
    public ResponseEntity<?> getMessages(@RequestParam String token,
                                         @RequestParam String pinCode) {
        try {
            List<ChatMessageResponse> messages = chatService.getMessages(token, pinCode);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(e.getMessage());
        }
    }
}