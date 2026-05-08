

export interface Task {
  id: number;
  type: string;
  startDate: Date;
  enDate: Date;
  createdOn: Date;
  cas: {
    id: number;
    caseId: string;
    status: {
      id: number;
      status: string;
    };
    procedure: {
      id: number;
      procedureLabel: string;
    };
    thirdParty: {
      id: number;
      thirdPartyId: any;
      tiersType: string;
      title: string;
      lastName: string;
      firstName: string;
      companyName: string;
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
      landLinePhone: string;
      faxNumber: string;
      commercialRegister: string;
      supportingDocumentType: string;
      supportingDocumentNumber: string;
      supportingDocumentExpirationDate: string;
      maritalStatus: string;
    };
    assignedAgent: {
      id: number;
      identificationNumber: string;
      userName: string;
      firstName: string;
      lastName: string;
      profile: {
        id: number;
        profile: string;
      };
      manager: {
        id: number;
        identificationNumber: string;
        userName: string;
        firstName: string;
        lastName: string;
        profile: {
          id: number;
          profile: string;
        };
        manager: any;
      };
    };
    startDate: string;
    principalAmount: number;
    interestAmount: number;
    penaltyAmount: number;
    totalAmount: number;
    commissionAmount: number;
    insuranceSettlementAmount: any;
    contributor: any;
  };
  owner: {
    id: number;
    identificationNumber: string;
    userName: string;
    firstName: string;
    lastName: string;
    email?:string;
    profile: {
      id: number;
      profile: string;
    };
    manager: {
      id: number;
      identificationNumber: string;
      userName: string;
      firstName: string;
      lastName: string;
      profile: {
        id: number;
        profile: string;
      };
      manager: any;
    };
  };
  taskObject: string;
  scheduledTo: Date;
  taskDescription: string,
  sendNotification: boolean,
  achievement:number,
  isNew:Boolean
}

  