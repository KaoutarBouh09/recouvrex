// vehicleGuarantee.ts

import { Credit } from "../Credit";


export interface VehicleGuarantee {
  id: number;
  credit: Pick<Credit, 'id'>;
  vehicleBrand: string;
  modelYear: number;
  registrationNumber: string;
  fuelType: string;
  fiscalHorsepower: number;
  type: string;
}
