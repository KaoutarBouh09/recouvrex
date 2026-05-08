package com.recouvrex.process.model.enums;

public enum FollowingActionEnum {
    PROMISE_OR_REMINDER("promesse ou relance"),
    TO_CONFIRM("action à confirmer");


    public final String label;

    private FollowingActionEnum(String label) {
        this.label = label;
    }
}
