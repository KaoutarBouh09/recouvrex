export interface ThirdParty {
    id:number;
    thirdPartyId: string;
    tiersType:'INSURANCE_COMPANY' | 'CUSTOMER_PP' | 'GUARANTOR' | 'CUSTOMER_PM' | 'USER' | ""; // You can add more types if needed
    title: string; // Optional
    lastName: string;
    firstName: string;
    companyName: string; // Optional
    birthDate: string;
    nationality: string;
    countryOfResidence: string;
    businessSector: string;
    legalForm: string;
    occupation: string;
    personalEmail: string;
    businessEmail: string;
    privatePhone: string;
    businessPhone: string;
    landLinePhone: string; // Optional
    faxNumber: string; // Optional
    commercialRegister: string; // Optional
    supportingDocumentType: 'CIN' | 'RESIDENCE_CARD' | 'PASSPORT' | "";// You can add more types if needed
    supportingDocumentNumber: string;
    supportingDocumentExpirationDate: string;
    maritalStatus: string;
    user: {
      id: number;
    };
  }