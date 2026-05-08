import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Credit } from 'src/models/Credit';

// Define the context type
type CreditContextType = {
  creditData: Credit;
  setCreditData: (data: Credit) => void;
};

// Create the client context
const CreditContext = createContext<CreditContextType>({
  creditData: {
      id: 0,
      creditId: '',
      creditType: '',
      nominalAmount: 0,
      cumulativeDisbursement: 0,
      setupDate: '',
      firstInstallmentDate: '',
      nominalRate: 0,
      rateNature: '',
      installmentCount: 0,
      deferredType: '',
      restructured: false,
      restructuringCount: 0,
      creditStatus: '',
      constantInstallmentAmount: 0,
      unpaidAmount: 0,
      insuranceAmount: 0,
      triggeredInstallmentNumber: 0,
      openingDate: '',
      modificationDate: '',
      lastStatusDate: '',
      cumulativeRedemptionAmount: 0,
      lastRedemptionDate: '',
      agency: '',
      manager: '',
      contract: {
          id: 0,
          contractId: ''
      },
      thirdParty: {
          id: 0,
          thirdPartyId: ''
      }
  },
  setCreditData: () => {}
});

// Custom hook to access the client context
export const useCredit = () => {
  const { creditData, setCreditData } = useContext(CreditContext);
  return { creditData, setCreditData };
};

// Define the props for the provider component
interface CreditProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const CreditProvider: FC<CreditProviderProps> = ({ children }) => {
  // State to hold client data
  const [creditData, setCreditData] = useState<Credit>({
    id: 0,
    creditId: '',
    creditType: '',
    nominalAmount: 0,
    cumulativeDisbursement: 0,
    setupDate: '',
    firstInstallmentDate: '',
    nominalRate: 0,
    rateNature: '',
    installmentCount: 0,
    deferredType: '',
    restructured: false,
    restructuringCount: 0,
    creditStatus: '',
    constantInstallmentAmount: 0,
    unpaidAmount: 0,
    insuranceAmount: 0,
    triggeredInstallmentNumber: 0,
    openingDate: '',
    modificationDate: '',
    lastStatusDate: '',
    cumulativeRedemptionAmount: 0,
    lastRedemptionDate: '',
    agency: '',
    manager: '',
    contract: {
        id: 0,
        contractId: ''
    },
    thirdParty: {
        id: 0,
        thirdPartyId: ''
    }

  });

  return (
    <CreditContext.Provider value={{ creditData, setCreditData }}>
      {children}
    </CreditContext.Provider>
  );
};