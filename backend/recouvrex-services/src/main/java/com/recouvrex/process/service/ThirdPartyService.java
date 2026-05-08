package com.recouvrex.process.service;

import com.recouvrex.process.model.ThirdParty;

import java.util.List;

public interface ThirdPartyService {

    // Crée un nouveau tiers
    ThirdParty createThirdParty(ThirdParty thirdParty);

    // Récupère tous les tiers liés à un utilisateur spécifique
    List<ThirdParty> getAllThirdPartyByUserId(Long userId);

    // Met à jour un tiers existant
    ThirdParty updateThirdParty(ThirdParty thirdParty);

    // Filtrage multi-critères des tiers
    List<ThirdParty> FilterThirdPartyMultiCriteria(Long userConnectedId, 
                                                   String thirdPartyId, 
                                                   String firstnameThird,
                                                   String lastnameThird, 
                                                   String personalEmail, 
                                                   String professionalEmail, 
                                                   String clientType, 
                                                   String companyName);

    // Filtrage d’un seul argument
    List<ThirdParty> filterThirdPartyUsingOneArg(Long userConnectedId, String searchKeyWord);

    // Création multiple de tiers
    List<ThirdParty> createMultipleThirdParties(List<ThirdParty> thirdParties);

    // Compte du nombre de tiers liés à un utilisateur
    Long countNbrThirdPartyByUser(Long userId);

    // ⚡ Optionnel : récupérer tous les tiers ayant des crédits impayés pour envoi de relance
    default List<ThirdParty> getOverdueClients() {
        throw new UnsupportedOperationException("Cette méthode doit être implémentée dans la classe concrète.");
    }
}
