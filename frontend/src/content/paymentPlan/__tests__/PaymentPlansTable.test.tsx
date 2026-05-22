// src/content/paymentPlan/__tests__/PaymentPlansTable.test.tsx

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import PaymentPlansTable from '../PaymentPlansTable';
import { UserContext } from 'src/contexts/UserContext';
import * as paymentPlanService from 'src/services/paymentPlanService';
import { PaymentPlanResponseDTO } from 'src/services/paymentPlanService';

// ── Mock des composants enfants lourds ────────────────────────────────────────
vi.mock('../CreatePaymentPlanDialog', () => ({
  default: () => <button>Nouveau plan</button>,
}));
vi.mock('../PaymentPlanDetailDialog', () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="detail-dialog">Détail plan</div> : null,
}));
vi.mock('src/components/Label', () => ({
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

// ── Mock du service ───────────────────────────────────────────────────────────
vi.mock('src/services/paymentPlanService', () => ({
  getPaymentPlansByCase: vi.fn(),
  downloadPaymentPlanPdf: vi.fn(),
}));

// ── Données de test ───────────────────────────────────────────────────────────
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

// ── Helper : rendu avec contexte ──────────────────────────────────────────────
const renderWithContext = (
  isAdmin = false,
  isRegionResponsable = false,
  isRecoveryAgent = false
) => {
  return render(
    <UserContext.Provider
      value={{
        currentUser: { id: 1, identificationNumber: '', userName: '', firstName: '', lastName: '', email: '', photo: '', nbrCaseAffected: undefined },
        setCurrentUser: vi.fn(),
        isAdmin: () => isAdmin,
        isRegionResponsable: () => isRegionResponsable,
        isRecoveryAgent: () => isRecoveryAgent,
      }}
    >
      <PaymentPlansTable caseId={10} totalAmount={5000} />
    </UserContext.Provider>
  );
};

describe('PaymentPlansTable', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('affiche un loader pendant le chargement des plans', async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockImplementation(
      () => new Promise(() => {})
    );
    renderWithContext();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it("affiche un message quand aucun plan n'existe", async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockResolvedValue([]);
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByText(/aucun plan de paiement/i)).toBeInTheDocument();
    });
  });

  it('affiche les données du plan dans le tableau', async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockResolvedValue([mockPlan]);
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByText('AGR-TEST1234')).toBeInTheDocument();
      expect(screen.getByText('Kaoutar Bouh')).toBeInTheDocument();
      expect(screen.getByText('500.00 DH')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('En cours')).toBeInTheDocument();
    });
  });

  it('affiche le bouton création uniquement pour Agent ou Admin', async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockResolvedValue([]);

    const { unmount } = renderWithContext(false, false, true);
    await waitFor(() => {
      expect(screen.getByText('Nouveau plan')).toBeInTheDocument();
    });
    unmount();

    renderWithContext(false, true, false);
    await waitFor(() => {
      expect(screen.queryByText('Nouveau plan')).not.toBeInTheDocument();
    });
  });

  it('ouvre le dialog de détail au clic sur Voir les échéances', async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockResolvedValue([mockPlan]);
    renderWithContext(true);
    await waitFor(() => screen.getByText('AGR-TEST1234'));
    fireEvent.click(screen.getByLabelText('Voir les échéances') ?? screen.getAllByRole('button')[2]);
    await waitFor(() => {
      expect(screen.getByTestId('detail-dialog')).toBeInTheDocument();
    });
  });

  it('affiche "—" si aucun validateur', async () => {
    vi.mocked(paymentPlanService.getPaymentPlansByCase).mockResolvedValue([mockPlan]);
    renderWithContext();
    await waitFor(() => {
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });
});
