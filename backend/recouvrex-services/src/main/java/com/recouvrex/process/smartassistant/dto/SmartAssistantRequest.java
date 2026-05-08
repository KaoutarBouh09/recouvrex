package com.recouvrex.process.smartassistant.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SmartAssistantRequest {
    private String clientNom;
    private String clientPrenom;
    private BigDecimal montantDu;
    private int joursRetard;
    private int nombreVersements;
    private int nombreVersementsManques;
    private int nombreRelancesEmail;
    private int nombreRelancesSms;
    private boolean dossierContentieux;
    private String statutContentieux;
}