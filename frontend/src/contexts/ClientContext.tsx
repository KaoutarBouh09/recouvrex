import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ThirdParty } from 'src/models/ThirdParty';

// Define the context type
type ClientContextType = {
  clientData: ThirdParty;
  setClientData: (data: ThirdParty) => void;
};

// Create the client context
const ClientContext = createContext<ClientContextType>({
  clientData: {
    id: 0,
    thirdPartyId: '',
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
    maritalStatus: '',
    user: { id: 0 }
  },
  setClientData: () => {}
});

// Custom hook to access the client context
export const useClient = () => {
  const { clientData, setClientData } = useContext(ClientContext);
  return { clientData, setClientData };
};

// Define the props for the provider component
interface ClientProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  // State to hold client data
  const [clientData, setClientData] = useState<ThirdParty>({
    id: 0,
    thirdPartyId: '',
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
    maritalStatus: '',
    user: { id: 0 }
  });

  return (
    <ClientContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientContext.Provider>
  );
};