package com.recouvrex.process.smartassistant.dto;

import lombok.Data;
import java.util.List;

@Data
public class SmartAssistantResponse {
    private String niveauRisque; // FAIBLE, MOYEN, ÉLEVÉ
    private String resume;
    private List<ActionRecommandee> actions;

    @Data
    public static class ActionRecommandee {
        private String titre;
        private String priorite; // HAUTE, MOYENNE, BASSE
        private String description;
    }
}