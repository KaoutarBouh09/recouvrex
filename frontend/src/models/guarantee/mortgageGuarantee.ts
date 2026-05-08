// mortgageGuarantee.ts

import { Credit } from "../Credit";

// garantie hypothécaire
export interface MortgageGuarantee {
  id: number;
  credit: Pick<Credit, 'id'>;
  ownerFullName: string;
  ownerAddress: string;
  nationalIDCardNumber: string;
  landTitleName: string;
  landTitleNumber: string;
  mortgageRank: string;
  landRegistryOfficeName: string;
  mortgageLoanAmount: number;
  mortgagedPropertyName: string;
  mortgagedPropertyArea: number;
  constructionsDescription: string;
  registrationDate: Date;
  mortgageStatus: string;
  type: string;
}
