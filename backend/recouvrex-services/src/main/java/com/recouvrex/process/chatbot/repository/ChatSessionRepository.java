package com.recouvrex.process.chatbot.repository;

import com.recouvrex.process.chatbot.model.ChatSession;
import com.recouvrex.process.chatbot.model.ChatSessionStatus;
import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    Optional<ChatSession> findByToken(String token);
    Optional<ChatSession> findByCase1AndStatus(Case case1, ChatSessionStatus status);
    List<ChatSession> findByAgent(User agent);
    List<ChatSession> findByAgentId(Long agentId);
}