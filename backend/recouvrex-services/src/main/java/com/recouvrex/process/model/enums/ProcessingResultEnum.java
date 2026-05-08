package com.recouvrex.process.model.enums;

public enum ProcessingResultEnum {
    DECES_INVALIDITE("Déçès_invalidé"),
    DIFFICULTE_DE_PAIEMENT("Difficulté de paiement"),
    DIFFICULTE_ENTREPRISE_OU_PROJET("Difficulté d'entreprise ou de projet"),
    INJOIGNABLE_PROVISOIRE("Injoignable provisoire"),
    INJOIGNABLE_DEFINITIF("Injoignable définitif"),
    REFUS_DE_PAIEMENT("Refus de paiement");

    public final String label;

    private ProcessingResultEnum(String label) {
        this.label = label;
    }
}
