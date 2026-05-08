package com.recouvrex.process.model.enums;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AgreementTypesEnum {

    REGLEMENT_INTEGRALE("Règlement intégrale"),
    REGLEMENT_ECHELONNE("Règlement échelonné"),
    PENALITE_ABANDONNE("Pénalité abandonné"),
    RESTRUCTURATION("Restructuration"),
    REPORT_D_ECHEANCES("Report d'échéances");

    private final String label;

}
