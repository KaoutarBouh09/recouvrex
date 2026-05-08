package com.recouvrex.process.chatbot.repository;

import com.recouvrex.process.chatbot.model.ConversationMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationMessageRepository extends JpaRepository<ConversationMessage, Long> {
    List<ConversationMessage> findBySessionOrderByTimestampAsc(
        com.recouvrex.process.chatbot.model.ChatSession session
    );
}