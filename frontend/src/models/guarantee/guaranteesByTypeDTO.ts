// guaranteesByTypeDTO.ts

import { BusinessFundGuarantee } from './businessFundGuarantee';
import { MortgageGuarantee } from './mortgageGuarantee';
import { PersonalGuarantee } from './personalGuarantee';
import { RealEstateGuarantee } from './realEstateGuarantee';
import { VehicleGuarantee } from './vehicleGuarantee';

export interface GuaranteesByTypeDTO {
  businessFundGuarantees: BusinessFundGuarantee[];
  mortgageGuarantees: MortgageGuarantee[];
  personalGuarantees: PersonalGuarantee[];
  realEstateGuarantees: RealEstateGuarantee[];
  vehicleGuarantees: VehicleGuarantee[];
}
