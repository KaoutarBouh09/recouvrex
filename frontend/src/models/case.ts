import { User } from "./User";

export type CaseStatus =
  'Predouteux' |
  'Douteux' |
  'compromis' |
  'contentieux' |
  'Deces' |
  'Invalidite' |
  'Termine' |
  'Radie';

export interface Case {
  id: number;
  caseId:string;
  date: string; // or Date if you intend to convert the string to a Date object
  status: {
    id: number;
    status: CaseStatus;
  };
  procedure: {
    id: number;
    procedureLabel: string;
  };
  thirdParty: {
    id: number;
    thirdPartyId: string | null;
    tiersType: string;
    title: string;
    lastName: string;
    firstName: string;
    companyName: string;
    birthDate: string; // or Date if you intend to convert the string to a Date object
    nationality: string;
    countryOfResidence: string;
    businessSector: string;
    legalForm: string;
    occupation: string;
    personalEmail: string;
    businessEmail: string;
    privatePhone: string;
    businessPhone: string;
    landLinePhone: string;
    faxNumber: string;
    commercialRegister: string;
    supportingDocumentType: string;
    supportingDocumentNumber: string;
    supportingDocumentExpirationDate: string; // or Date if you intend to convert the string to a Date object
    maritalStatus: string;
  };
  // assignedAgent: {
  //   id: number;
  //   identificationNumber: string;
  //   userName: string;
  //   firstName: string;
  //   lastName: string;
  //   profile: {
  //     id: number;
  //     profile: string;
  //   };
  //   manager: any; // or whatever type is appropriate
  // };
  assignedAgent:User
  startDate: string; // or Date if you intend to convert the string to a Date object
  principalAmount: number;
  interestAmount: number;
  penaltyAmount: number;
  totalAmount: number;
  commissionAmount: number;
  insuranceSettlementAmout: number;
  contributor: any; // or whatever type is appropriate
}

