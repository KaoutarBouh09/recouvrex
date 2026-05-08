package com.recouvrex.process.model.enums;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AgreementStatusTypesEnum {

    REJETE("Rejeté"),
    ACCEPTE("Accepté"),
    EN_COURS("En cours"),
    TERMINE("Terminé"),
    ANNULE("Annulé");
    private final String label;

}
