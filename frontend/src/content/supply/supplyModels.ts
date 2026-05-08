export interface Credit {
    id: number;
    creditId: string |null;
    creditType: string;
    nominalAmount: number;
    cumulativeDisbursement: number;
    setupDate: string;
    firstInstallmentDate: string;
    nominalRate: number;
    rateNature: string;
    installmentCount: number;
    deferredType: string;
    restructured: boolean;
    restructuringCount: number;
    creditStatus: string;
    constantInstallmentAmount: number;
    unpaidAmount: number;
    insuranceAmount: number;
    triggeredInstallmentNumber: number;
    openingDate: string;
    modificationDate: string;
    lastStatusDate: string;
    cumulativeRedemptionAmount: number;
    lastRedemptionDate: string;
    agency: string;
    manager: string;
    contract: {
      id: number;
    };
    thirdParty: {
      id: number;
    };
  }
  
  export interface Case {
    id: number ;
    caseId: string |null;
    status: {
      id: number;
    };
    procedure: {
      id: number;
    };
    thirdParty: {
      id: number;
    };
    assignedAgent: {
      id: number;
    };
    startDate: string;
    principalAmount: number;
    interestAmount: number;
    penaltyAmount: number;
    totalAmount: number;
    commissionAmount: number;
    insuranceSettlementAmount: number;
    contributor: {
      id: number;
    };
  }

  export interface DueDate {
    id: number;
    dueDateId: string|null;
    paymentDueDate: string;
    dueDateStatus: string;
    principalAmount: number;
    interestAmount: number;
    insuranceAmount: number;
    ancillaryCharge: number;
    remainingPrincipalBalance: number;
    startDate: string;
    modificationDate: string;
    totalInstallmentAmount: number;
    latePaymentCharge: number;
    unpaidPrincipalAmount: number;
    accruedInterest: number;
    unpaidInsurancePrenium: number;
    unpaidAncillaryCharges: number;
    get_case: {
      id: number;
    };
    credit: {
      id: number;
    };
  }
  
  