// src/services/paymentPlanService.ts

import axiosInstance from 'src/config/axiosConfig'; // adapter le chemin selon votre projet

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface CreatePaymentPlanDTO {
  caseId: number;
  totalAmount: number;
  numberOfInstallments: number;
  interestRate?: number;
  firstPaymentDate: string; // format: "YYYY-MM-DD"
  templateId?: number;
  description?: string;
}

export interface InstallmentDTO {
  id: number;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'EN_ATTENTE' | 'REGLE' | 'EN_RETARD';
  paidDate: string | null;
  reminderSent: boolean;
}

export interface PaymentPlanResponseDTO {
  agreementId: number;
  agreementCode: string;
  agreementDate: string;
  status: 'EN_COURS' | 'ACCEPTE' | 'REJETE' | 'ANNULE' | 'TERMINE';
  totalAmount: number;
  monthlyPaymentAmount: number;
  interestAmount: number;
  totalAmountWithInterest: number;
  numberOfInstallments: number;
  firstPaymentDate: string;
  initiatorName: string;
  validatorName: string | null;
  pdfFilePath: string | null;
  installments: InstallmentDTO[];
}

// ─── API CALLS ────────────────────────────────────────────────────────────────

// Créer un plan de paiement (Agent)
export const createPaymentPlan = async (
  dto: CreatePaymentPlanDTO,
  initiatorId: number
): Promise<PaymentPlanResponseDTO> => {
  const response = await axiosInstance.post(
    `/api/payment-plan/?initiatorId=${initiatorId}`,
    dto
  );
  return response.data;
};

// Obtenir un plan par ID
export const getPaymentPlanById = async (
  id: number
): Promise<PaymentPlanResponseDTO> => {
  const response = await axiosInstance.get(`/api/payment-plan/${id}`);
  return response.data;
};

// Lister les plans d'un cas (Agent/Admin)
export const getPaymentPlansByCase = async (
  caseId: number
): Promise<PaymentPlanResponseDTO[]> => {
  const response = await axiosInstance.get(
    `/api/payment-plan/getPaymentPlans?caseId=${caseId}`
  );
  return response.data;
};

// Lister les plans en attente de validation (Responsable)
export const getPendingPaymentPlans = async (
  managerId: number
): Promise<PaymentPlanResponseDTO[]> => {
  const response = await axiosInstance.get(
    `/api/payment-plan/getPaymentPlans?managerId=${managerId}`
  );
  return response.data;
};

// Valider un plan (Responsable/Admin)
export const validatePaymentPlan = async (
  id: number,
  validatorId: number,
  comment?: string
): Promise<PaymentPlanResponseDTO> => {
  const response = await axiosInstance.put(
    `/api/payment-plan/validate/${id}?validatorId=${validatorId}`,
    { comment }
  );
  return response.data;
};

// Rejeter un plan (Responsable/Admin)
export const rejectPaymentPlan = async (
  id: number,
  validatorId: number,
  reason: string
): Promise<PaymentPlanResponseDTO> => {
  const response = await axiosInstance.put(
    `/api/payment-plan/reject/${id}?validatorId=${validatorId}`,
    { reason }
  );
  return response.data;
};

// Annuler un plan
export const cancelPaymentPlan = async (
  id: number,
  userId: number,
  reason: string
): Promise<void> => {
  await axiosInstance.put(
    `/api/payment-plan/cancel/${id}?userId=${userId}`,
    { reason }
  );
};

// Télécharger le PDF d'un plan
export const downloadPaymentPlanPdf = async (id: number): Promise<void> => {
  const response = await axiosInstance.get(
    `/api/payment-plan/download-pdf/${id}`,
    { responseType: 'blob' }
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `plan_paiement_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// Enregistrer un paiement sur une échéance
export const recordInstallmentPayment = async (
  installmentId: number,
  reglementId?: number
): Promise<void> => {
  const params = reglementId ? `?reglementId=${reglementId}` : '';
  await axiosInstance.put(
    `/api/payment-plan/installments/${installmentId}/pay${params}`
  );

};
export interface ReminderHistoryDTO {
  id: number;
  channel: 'EMAIL' | 'SMS';
  status: 'SUCCESS' | 'FAILED';
  sentAt: string;
  recipient: string;
  errorMessage?: string;
}

export const getReminderHistory = async (installmentId: number): Promise<ReminderHistoryDTO[]> => {
  const response = await axiosInstance.get(`/api/reminders/installment/${installmentId}`);
  return response.data;
};