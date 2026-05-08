// businessFundGuarantee.ts

import { Credit } from "../Credit";



export interface BusinessFundGuarantee {
  id: number;
  credit: Pick<Credit, 'id'>; // Include only the 'id' property from Credit
  ownerFullName: string;
  corporateName: string;
  socialCapital: number;
  commerceRegistryNumber: string;
  commerceRegistryCity: string;
  managerFullName: string;
  managerNationalIDCard: string;
  tradeName: string;
  pledgeRank: string;
  pledgeRealizationDate: Date;
  pledgeExpirationDate: Date;
  type: string;
}
