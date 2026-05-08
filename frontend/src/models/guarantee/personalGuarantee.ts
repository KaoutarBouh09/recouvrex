// personalGuarantee.ts

import { Credit } from "../Credit";

// Caution Personnelle
export interface PersonalGuarantee {
  id: number;
  credit: Pick<Credit, 'id'>;
  guarantorLastName: string;
  guarantorFirstName: string;
  guarantorPhoneNumber: string;
  guarantorNationalID: string;
  guarantorIDExpirationDate: Date;
  relationshipWithClient: string;
  guarantorResidenceAddress: string;
  guarantorActivity: string;
  guarantorMonthlyIncome: number;
  guarantorResidualIncome: number;
  totalOutstandingInstallments: number;
  activitySeniority: number;
  guarantorEmployer: string;
  guarantorProfessionalAddress: string;
  type: string;
}
