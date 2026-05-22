package com.recouvrex.process.smartassistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recouvrex.process.smartassistant.dto.SmartAssistantRequest;
import com.recouvrex.process.smartassistant.dto.SmartAssistantResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;
import static org.mockito.ArgumentMatchers.contains;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests GeminiService (Smart Assistant)")
class GeminiServiceTest {

    @Mock private RestTemplate restTemplate;
    @Mock private ObjectMapper objectMapper;

    @InjectMocks
    private GeminiService geminiService;

    private SmartAssistantRequest buildRequest() {
        SmartAssistantRequest request = new SmartAssistantRequest();
        request.setClientPrenom("Youssef");
        request.setClientNom("Alaoui");
        request.setMontantDu(new BigDecimal("8500.00"));
        request.setJoursRetard(45);
        request.setNombreVersements(2);
        request.setNombreVersementsManques(3);
        request.setNombreRelancesEmail(2);
        request.setNombreRelancesSms(1);
        request.setDossierContentieux(false);
        return request;
    }

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(geminiService, "apiKey", "test-api-key");
        ReflectionTestUtils.setField(geminiService, "apiUrl", "https://gemini.fake/v1/models/gemini:generateContent");
    }

    // =====================================================================
    // TEST 1 — analyzeCase : réponse Gemini valide → parsing correct
    // =====================================================================
    @Test
    @DisplayName("analyzeCase - doit parser correctement la réponse JSON de Gemini")
    void analyzeCase_shouldParseGeminiResponseCorrectly() throws Exception {
        // GIVEN
        String geminiJson = """
            {
              "niveauRisque": "ELEVE",
              "resume": "Client en retard de 45 jours avec 3 versements manques.",
              "actions": [
                {
                  "titre": "Mise en demeure",
                  "priorite": "HAUTE",
                  "description": "Envoyer une mise en demeure formelle par courrier recommande."
                }
              ]
            }
            """;

        // Simuler la réponse JSON de l'API Gemini
        ObjectMapper realMapper = new ObjectMapper();
        JsonNode fakeApiResponse = realMapper.readTree("""
            {
              "candidates": [{
                "content": {
                  "parts": [{ "text": "%s" }]
                }
              }]
            }
            """.formatted(geminiJson.replace("\n", "\\n").replace("\"", "\\\"")));

        SmartAssistantResponse expectedResponse = new SmartAssistantResponse();
        expectedResponse.setNiveauRisque("ELEVE");
        expectedResponse.setResume("Client en retard de 45 jours avec 3 versements manques.");

        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok(fakeApiResponse));
        when(objectMapper.readValue(anyString(), eq(SmartAssistantResponse.class)))
                .thenReturn(expectedResponse);

        // WHEN
        SmartAssistantResponse result = geminiService.analyzeCase(buildRequest());

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getNiveauRisque()).isEqualTo("ELEVE");
        assertThat(result.getResume()).contains("45 jours");
        verify(restTemplate).exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(JsonNode.class));
    }

    // =====================================================================
    // TEST 2 — analyzeCase : API Gemini indisponible → fallback retourné
    // =====================================================================
    @Test
    @DisplayName("analyzeCase - doit retourner le fallback si Gemini est indisponible")
    void analyzeCase_shouldReturnFallbackOnApiError() {
        // GIVEN
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(JsonNode.class)))
                .thenThrow(new RuntimeException("Connection refused"));

        // WHEN
        SmartAssistantResponse result = geminiService.analyzeCase(buildRequest());

        // THEN — fallback retourné, pas d'exception levée
        assertThat(result).isNotNull();
        assertThat(result.getNiveauRisque()).isEqualTo("MOYEN");
        assertThat(result.getResume()).contains("indisponible");
        assertThat(result.getActions()).isEmpty();
    }

    // =====================================================================
    // TEST 3 — analyzeCase : JSON malformé → fallback retourné
    // =====================================================================
    @Test
    @DisplayName("analyzeCase - doit retourner le fallback si le JSON Gemini est invalide")
    void analyzeCase_shouldReturnFallbackOnJsonParseError() throws Exception {
        // GIVEN — Gemini renvoie du texte non-JSON
        ObjectMapper realMapper = new ObjectMapper();
        JsonNode fakeResponse = realMapper.readTree("""
            {
              "candidates": [{
                "content": {
                  "parts": [{ "text": "Désolé, je ne peux pas analyser ce dossier." }]
                }
              }]
            }
            """);

        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok(fakeResponse));
        when(objectMapper.readValue(anyString(), eq(SmartAssistantResponse.class)))
                .thenThrow(new com.fasterxml.jackson.core.JsonParseException(null, "Unexpected token"));

        // WHEN
        SmartAssistantResponse result = geminiService.analyzeCase(buildRequest());

        // THEN
        assertThat(result).isNotNull();
        assertThat(result.getNiveauRisque()).isEqualTo("MOYEN");
        assertThat(result.getActions()).isEmpty();
    }

    // =====================================================================
    // TEST 4 — analyzeCase : URL construite avec la clé API
    // =====================================================================
    @Test
    @DisplayName("analyzeCase - doit appeler l'URL Gemini avec la clé API")
    void analyzeCase_shouldCallCorrectUrlWithApiKey() throws Exception {
        // GIVEN
        ObjectMapper realMapper = new ObjectMapper();
        JsonNode fakeResponse = realMapper.readTree("""
            {
              "candidates": [{
                "content": {
                  "parts": [{ "text": "{\\"niveauRisque\\":\\"FAIBLE\\",\\"resume\\":\\"OK\\",\\"actions\\":[]}" }]
                }
              }]
            }
            """);

        SmartAssistantResponse expected = new SmartAssistantResponse();
        expected.setNiveauRisque("FAIBLE");
        expected.setResume("OK");
        expected.setActions(List.of());

        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok(fakeResponse));
        when(objectMapper.readValue(anyString(), eq(SmartAssistantResponse.class)))
                .thenReturn(expected);

        // WHEN
        geminiService.analyzeCase(buildRequest());
        // THEN — vérifier que exchange a été appelé avec la bonne URL
        verify(restTemplate).exchange(
            contains("key=test-api-key"),
            eq(HttpMethod.POST),
            any(HttpEntity.class),
            eq(JsonNode.class)
        );
    }
}

// =========================================================================
// Tests SmartAssistantService (délégation vers GeminiService)
// =========================================================================

class SmartAssistantServiceTest {

    @org.junit.jupiter.api.Test
    @DisplayName("analyze - doit déléguer l'appel à GeminiService")
    void analyze_shouldDelegateToGeminiService() {
        // GIVEN
        GeminiService geminiService = mock(GeminiService.class);
        SmartAssistantService service = new SmartAssistantService(geminiService);

        SmartAssistantRequest request = new SmartAssistantRequest();
        SmartAssistantResponse expected = new SmartAssistantResponse();
        expected.setNiveauRisque("FAIBLE");

        when(geminiService.analyzeCase(request)).thenReturn(expected);

        // WHEN
        SmartAssistantResponse result = service.analyze(request);

        // THEN
        assertThat(result.getNiveauRisque()).isEqualTo("FAIBLE");
        verify(geminiService).analyzeCase(request);
    }
}
