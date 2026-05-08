import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Credit } from 'src/models/Credit';
import { DueDate, DueDateInterface } from 'src/models/DueDate';

// Define the context type
type DueDateContextType = {
    dueDateData: DueDateInterface;
  setDueDateData: (data: DueDateInterface) => void;
};

// Create the client context 
const DueDateContext = createContext<DueDateContextType>({
    dueDateData: {
      id: 0,
      dueDateId: '',
      paymentDueDate: '',
      dueDateStatus: '',
      principalAmount: 0,
      interestAmount: 0,
      insuranceAmount: 0,
      ancillaryCharge: 0,
      remainingPrincipalBalance: 0,
      startDate: '',
      modificationDate: '',
      totalInstallmentAmount: 0,
      latePaymentCharge: 0,
      unpaidPrincipalAmount: 0,
      accruedInterest: 0,
      unpaidInsurancePrenium: 0,
      unpaidAncillaryCharges: 0,
      credit: {
        id: 0
      },
      _case: {
        id: 0,
        caseId: '',
        status: {
          id: 0,
          status: ''
        },
        procedure: {
          id: 0,
          procedureLabel: ''
        },
        thirdParty: {
          id: 0,
          thirdPartyId: undefined,
          tiersType: '',
          title: '',
          lastName: '',
          firstName: '',
          companyName: '',
          birthDate: '',
          nationality: '',
          countryOfResidence: '',
          businessSector: '',
          legalForm: '',
          occupation: '',
          personalEmail: '',
          businessEmail: '',
          privatePhone: '',
          businessPhone: '',
          landLinePhone: '',
          faxNumber: '',
          commercialRegister: '',
          supportingDocumentType: '',
          supportingDocumentNumber: '',
          supportingDocumentExpirationDate: '',
          maritalStatus: ''
        }
      },
      reglements: null,
      expectedPaymentDate: ''
    },
  setDueDateData: () => {}
});

// Custom hook to access the client context
export const useDueDate = () => {
  const { dueDateData, setDueDateData } = useContext(DueDateContext);
  return { dueDateData, setDueDateData };
};

// Define the props for the provider component
interface DueDateProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const DueDateProvider: FC<DueDateProviderProps> = ({ children }) => {
  // State to hold client data
  const [dueDateData, setDueDateData] = useState<DueDateInterface>({
    id: 0,
    dueDateId: '',
    paymentDueDate: '',
    dueDateStatus: '',
    principalAmount: 0,
    interestAmount: 0,
    insuranceAmount: 0,
    ancillaryCharge: 0,
    remainingPrincipalBalance: 0,
    startDate: '',
    modificationDate: '',
    totalInstallmentAmount: 0,
    latePaymentCharge: 0,
    unpaidPrincipalAmount: 0,
    accruedInterest: 0,
    unpaidInsurancePrenium: 0,
    unpaidAncillaryCharges: 0,
    credit: {
        id: 0
    },
    _case: {
        id: 0,
        caseId: '',
        status: {
            id: 0,
            status: ''
        },
        procedure: {
            id: 0,
            procedureLabel: ''
        },
        thirdParty: {
            id: 0,
            thirdPartyId: undefined,
            tiersType: '',
            title: '',
            lastName: '',
            firstName: '',
            companyName: '',
            birthDate: '',
            nationality: '',
            countryOfResidence: '',
            businessSector: '',
            legalForm: '',
            occupation: '',
            personalEmail: '',
            businessEmail: '',
            privatePhone: '',
            businessPhone: '',
            landLinePhone: '',
            faxNumber: '',
            commercialRegister: '',
            supportingDocumentType: '',
            supportingDocumentNumber: '',
            supportingDocumentExpirationDate: '',
            maritalStatus: ''
        }
    },
    reglements: null,
    expectedPaymentDate: ''


  });

  return (
    <DueDateContext.Provider value={{ dueDateData, setDueDateData }}>
      {children}
    </DueDateContext.Provider>
  );
};