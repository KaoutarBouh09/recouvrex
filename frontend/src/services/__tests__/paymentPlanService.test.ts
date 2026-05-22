// src/services/__tests__/paymentPlanService.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import axiosInstance from 'src/config/axiosConfig';

vi.mock('src/config/axiosConfig', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

import {
  getPaymentPlansByCase,
  createPaymentPlan,
  validatePaymentPlan,
  rejectPaymentPlan,
  recordInstallmentPayment,
  PaymentPlanResponseDTO,
} from 'src/services/paymentPlanService';

const mockPlan: PaymentPlanResponseDTO = {
  agreementId: 1,
  agreementCode: 'AGR-TEST1234',
  agreementDate: '2025-01-15',
  status: 'EN_COURS',
  totalAmount: 5000,
  monthlyPaymentAmount: 500,
  interestAmount: 0,
  totalAmountWithInterest: 5000,
  numberOfInstallments: 10,
  firstPaymentDate: '2025-02-01',
  initiatorName: 'Kaoutar Bouh',
  validatorName: null,
  pdfFilePath: null,
  installments: [],
};

describe('paymentPlanService', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===========================================================================
  // TEST 1 — getPaymentPlansByCase
  // ===========================================================================
  it('getPaymentPlansByCase - appelle le bon endpoint et retourne les données', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: [mockPlan] });

    const result = await getPaymentPlansByCase(10);

    expect(axiosInstance.get).toHaveBeenCalledWith('/api/payment-plan/getPaymentPlans?caseId=10');
    expect(result).toHaveLength(1);
    expect(result[0].agreementCode).toBe('AGR-TEST1234');
  });

  // ===========================================================================
  // TEST 2 — createPaymentPlan
  // ===========================================================================
  it('createPaymentPlan - appelle POST avec initiatorId dans l\'URL', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: mockPlan });

    const dto = {
      caseId: 10,
      totalAmount: 5000,
      numberOfInstallments: 10,
      firstPaymentDate: '2025-02-01',
    };

    const result = await createPaymentPlan(dto, 1);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/api/payment-plan/?initiatorId=1',
      dto
    );
    expect(result.agreementCode).toBe('AGR-TEST1234');
  });

  // ===========================================================================
  // TEST 3 — validatePaymentPlan
  // ===========================================================================
  it('validatePaymentPlan - appelle PUT avec validatorId et commentaire', async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: { ...mockPlan, status: 'ACCEPTE' } });

    const result = await validatePaymentPlan(1, 2, 'Approuvé');

    expect(axiosInstance.put).toHaveBeenCalledWith(
      '/api/payment-plan/validate/1?validatorId=2',
      { comment: 'Approuvé' }
    );
    expect(result.status).toBe('ACCEPTE');
  });

  // ===========================================================================
  // TEST 4 — rejectPaymentPlan
  // ===========================================================================
  it('rejectPaymentPlan - appelle PUT avec la raison de rejet', async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: { ...mockPlan, status: 'REJETE' } });

    const result = await rejectPaymentPlan(1, 2, 'Montant trop élevé');

    expect(axiosInstance.put).toHaveBeenCalledWith(
      '/api/payment-plan/reject/1?validatorId=2',
      { reason: 'Montant trop élevé' }
    );
    expect(result.status).toBe('REJETE');
  });

  // ===========================================================================
  // TEST 5 — recordInstallmentPayment
  // ===========================================================================
  it('recordInstallmentPayment - appelle PUT sans paramètre si reglementId absent', async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: {} });

    await recordInstallmentPayment(5);

    expect(axiosInstance.put).toHaveBeenCalledWith(
      '/api/payment-plan/installments/5/pay'
    );
  });
});
