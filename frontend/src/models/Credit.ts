// import { Contract } from "./Contract";
// import { ThirdParty } from "./ThirdParty";

export interface Credit {
    id :number;
    creditId: string; // Identifiant du crédit
    creditType: string; // Type de crédit
    nominalAmount: number; // Montant nominal
    cumulativeDisbursement: number; // Déblocage cumulatif
    setupDate: string; // Date de mise en place
    firstInstallmentDate: string; // Date de la première échéance
    nominalRate: number; // Taux nominal
    rateNature: string; // Nature du taux
    installmentCount: number; // Nombre d'échéances
    deferredType: string; // Type de différé
    restructured: boolean; // Restructuré (oui/non)
    restructuringCount: number; // Nombre de restructurations
    creditStatus: string; // Statut du crédit
    constantInstallmentAmount: number; // Montant de l'échéance constante
    unpaidAmount: number; // Montant impayé
    insuranceAmount: number; // Montant de l'assurance
    triggeredInstallmentNumber: number; // Numéro d'échéance déclenchée
    openingDate: string; // Date d'ouverture
    modificationDate: string; // Date de modification
    lastStatusDate: string; // Date du dernier statut
    cumulativeRedemptionAmount: number; // Montant cumulé des rachats
    lastRedemptionDate: string; // Date du dernier rachat
    agency: string; // Agence
    manager: string; // Gestionnaire a modifier 99%
    contract:{
        id:number;
        contractId:string
    }; // Identifiant du contrat
    thirdParty: {
         id:number;
         thirdPartyId:string;
    }; // Tiers
  }
  