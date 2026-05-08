// realEstateGuarantee.ts

import { Credit } from "../Credit";

// Bien immobilier ملكية عقارية
export interface RealEstateGuarantee {
  id: number;
  credit: Pick<Credit, 'id'>;
  ownerLastName: string;
  ownerFirstName: string;
  ownerAddress: string;
  ownerNationalID: string;
  landTitleName: string;
  landTitleNumber: string;
  purchaseDeed: string;
  rank: string;
  landRegistryName: string;
  loanAmount: number;
  propertyName: string;
  area: number;
  constructionDescription: string;
  registrationDate: Date;
  type: string;
}
