package com.recouvrex.process.smartassistant.controller;

import com.recouvrex.process.smartassistant.dto.SmartAssistantRequest;
import com.recouvrex.process.smartassistant.dto.SmartAssistantResponse;
import com.recouvrex.process.smartassistant.service.CaseSummaryService;
import com.recouvrex.process.smartassistant.service.SmartAssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/smart-assistant")
@RequiredArgsConstructor
public class SmartAssistantController {

    private final SmartAssistantService smartAssistantService;
    private final CaseSummaryService caseSummaryService;

    // Endpoint existant — analyse directe avec request body
    @PostMapping("/analyze")
    public ResponseEntity<SmartAssistantResponse> analyze(
            @RequestBody SmartAssistantRequest request) {
        return ResponseEntity.ok(smartAssistantService.analyze(request));
    }

    // ✅ NOUVEAU — agrège les données + analyse en un seul appel
    @GetMapping("/analyze/{caseId}")
    public ResponseEntity<SmartAssistantResponse> analyzeByCaseId(
            @PathVariable Long caseId) {
        SmartAssistantRequest request = caseSummaryService.buildSummary(caseId);
        return ResponseEntity.ok(smartAssistantService.analyze(request));
    }
}