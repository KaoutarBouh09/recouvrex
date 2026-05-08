package com.recouvrex.process.model.enums;

public enum StatusEnum {
    PRE_DOUTEUX("Pré-douteux"),
    DOUTEUX("Douteux"),
    COMITE_IMPAYES("Comité des impayés"),

    COMITE_DECLASSEMENT_AGENCE("Comité de déclassement agence"),
    RADIE("Radié"),
    PRE_CONTENTIEUX("Pré-contentieux"),
    CONTENTIEUX("Contentieux"),
    SAISIE_CONSERVATION_IMMOBILIERE_INITIEE("Saisie conservation immobilière initiée"),
    TERMINE("Terminé");


    public final String label;

    private StatusEnum(String label) {
        this.label = label;
    }
}