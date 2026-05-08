package com.recouvrex.process.model.enums;

// I added this because it I think the procedure is abit similer to status so there
//is a limited list of labels
public enum ProcedureEnum {
    MISE_EN_DEMEURE("Mise en demeure"),
    SAISIE_DES_FONDS_DE_COMMERCE("Saisie des fonds de commerce"),
    SAISIE_DES_BIENS_MOBILIERS("Saisie des biens mobiliers"),
    SAISIE_ARRET_BANCAIRES("Saisie-arrêt bancaires"),
    SAISIE_CONSERVATOIRE_IMMOBILIERE("Saisie conservatoire immobilière"),
    SAISIE_CONSERVATOIRE_SUR_LES_PARTS_SOCIALES("Saisie conservatoire sur les parts sociales"),
    INJONCTION_DE_PAYER("Injonction de payer"),
    ACTION_AU_FOND("Action au fond"),
    VENTE_GLOBALE_DU_FOND_DE_COMMERCE("Vente globale du fond de commerce");

    private final String label;

    ProcedureEnum(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

