package com.recouvrex.process.chatbot.model;

import com.recouvrex.process.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "conversation_message")
public class ConversationMessage extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "session_id")
    private ChatSession session;

    @Enumerated(EnumType.STRING)
    private MessageSender sender;  // CLIENT, AI, AGENT

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }
}