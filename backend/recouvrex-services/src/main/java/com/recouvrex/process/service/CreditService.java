package com.recouvrex.process.service;

import com.recouvrex.process.model.Credit;

import java.util.List;

public interface CreditService {

    // Crée un nouveau crédit
    Credit createCredit(Credit credit);

    // Récupère tous les crédits pour un tiers donné (via son thirdPartyId)
    List<Credit> getCredits(Long thirdPartyId);

    // Met à jour un crédit existant
    Credit updateCredit(Credit credit);

    // Crée plusieurs crédits en une seule opération
    List<Credit> createMultipleCredits(List<Credit> credits);

    // ⚡ Optionnel : récupérer les crédits dont le paiement est en retard
    default List<Credit> getOverdueCredits() {
        throw new UnsupportedOperationException("Cette méthode doit être implémentée dans la classe de service.");
    }
}
