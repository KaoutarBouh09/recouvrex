package com.recouvrex.process.smartassistant.service;

import com.recouvrex.process.smartassistant.dto.SmartAssistantRequest;
import com.recouvrex.process.smartassistant.dto.SmartAssistantResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmartAssistantService {

    private final GeminiService geminiService;

    public SmartAssistantResponse analyze(SmartAssistantRequest request) {
        return geminiService.analyzeCase(request);
    }
}