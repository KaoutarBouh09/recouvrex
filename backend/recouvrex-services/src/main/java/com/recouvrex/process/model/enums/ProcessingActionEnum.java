package com.recouvrex.process.model.enums;

public enum ProcessingActionEnum {
    CONFIRME_ACTION("action confirmée"),
    REJECT_ACTION("action rejetée");


    public final String label;

    private ProcessingActionEnum(String label) {
        this.label = label;
    }
}
