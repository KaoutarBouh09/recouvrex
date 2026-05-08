package com.recouvrex.process.chatbot.model;

import com.recouvrex.process.model.BaseEntity;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "chat_session")
public class ChatSession extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "case_id")
    private Case case1;

    @Column(unique = true, nullable = false)
    private String token;         // token unique dans le lien email

    @Column(nullable = false)
    private String pinCode;       // code PIN à 6 chiffres envoyé au client

    @Enumerated(EnumType.STRING)
    private ChatSessionStatus status; // ACTIVE, EXPIRED, CLOSED, AGENT_TOOK_OVER

    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;  // createdAt + 7 jours
    private LocalDateTime closedAt;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User agent;           // agent assigné (copié depuis Case)

    private String summary;       // résumé généré à la fin

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.expiresAt = this.createdAt.plusDays(7);
        if (this.status == null) this.status = ChatSessionStatus.ACTIVE;
    }
}