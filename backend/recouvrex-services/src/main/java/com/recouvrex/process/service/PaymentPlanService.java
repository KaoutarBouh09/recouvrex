package com.recouvrex.process.service;

import com.recouvrex.process.dto.CreatePaymentPlanDTO;
import com.recouvrex.process.dto.InstallmentDTO;
import com.recouvrex.process.dto.PaymentPlanResponseDTO;
import com.recouvrex.process.dto.UpdatePaymentPlanDTO;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;

import java.util.List;

public interface PaymentPlanService {

    // Créer un nouveau plan de paiement
    PaymentPlanResponseDTO createPaymentPlan(CreatePaymentPlanDTO dto, Long initiatorId);

    // ✅ Modifier un plan (Agent, statut EN_COURS)
    PaymentPlanResponseDTO updatePaymentPlan(Long agreementId, UpdatePaymentPlanDTO dto);

    // ✅ Supprimer un plan (Agent, statut EN_COURS ou REJETE)
    void deletePaymentPlan(Long agreementId);

    // Obtenir un plan par ID
    PaymentPlanResponseDTO getPaymentPlanById(Long agreementId);

    // Lister tous les plans d'un cas
    List<PaymentPlanResponseDTO> getPaymentPlansByCase(Long caseId);

    // Lister les plans en attente de validation (pour responsable)
    List<PaymentPlanResponseDTO> getPendingPaymentPlans(Long managerId);

    // Valider un plan (par responsable/admin)
    PaymentPlanResponseDTO validatePaymentPlan(Long agreementId, Long validatorId, String comment);

    // Rejeter un plan
    PaymentPlanResponseDTO rejectPaymentPlan(Long agreementId, Long validatorId, String reason);

    // Annuler un plan
    void cancelPaymentPlan(Long agreementId, Long userId, String reason);

    // Générer le PDF du plan
    String generatePaymentPlanPdf(Long agreementId);

    // Enregistrer un paiement sur une échéance
    void recordInstallmentPayment(Long installmentId, Long reglementId);

    // Vérifier et envoyer les rappels d'échéances
    void sendInstallmentReminders();

    // Obtenir le statut global d'un plan
    AgreementStatusTypesEnum getPaymentPlanStatus(Long agreementId);

    // Récupérer les échéances à venir pour un utilisateur (dans les X prochains jours)
    List<InstallmentDTO> getUpcomingInstallments(Long userId, int daysAhead);
}
