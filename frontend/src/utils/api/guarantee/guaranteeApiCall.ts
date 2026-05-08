import instance from "src/config/axiosConfig";
import { BusinessFundGuarantee } from "src/models/guarantee/businessFundGuarantee";
import { GuaranteesByTypeDTO } from "src/models/guarantee/guaranteesByTypeDTO";
import { MortgageGuarantee } from "src/models/guarantee/mortgageGuarantee";
import { PersonalGuarantee } from "src/models/guarantee/personalGuarantee";
import { RealEstateGuarantee } from "src/models/guarantee/realEstateGuarantee";
import { VehicleGuarantee } from "src/models/guarantee/vehicleGuarantee";

export async function getAllGuaranteesByCreditId(
  creditId: string
): Promise<GuaranteesByTypeDTO> {
  try {
    // Make the GET request
    const response = await instance.get<GuaranteesByTypeDTO>(
      `/api/guarantees/byCredit/${creditId}`
    );
    console.log("all the retrieved guarantees");
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch guarantees: ${error}`);
  }
}

export async function createGuarantee(
  guarantee:
    | BusinessFundGuarantee
    | MortgageGuarantee
    | PersonalGuarantee
    | RealEstateGuarantee
    | VehicleGuarantee,
  type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
): Promise<
  | BusinessFundGuarantee
  | MortgageGuarantee
  | PersonalGuarantee
  | RealEstateGuarantee
  | VehicleGuarantee
> {
  try {
    // Make the POST request based on the guarantee type
    const response = await instance.post<
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee
    >(`/api/guarantees/type_${type.toLowerCase()}`, guarantee);
    console.log("Created guarantee:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to create guarantee: ${error}`);
  }
}

export async function updateGuarantee(
  id: number,
  guarantee:
    | BusinessFundGuarantee
    | MortgageGuarantee
    | PersonalGuarantee
    | RealEstateGuarantee
    | VehicleGuarantee,
  type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
): Promise<
  | BusinessFundGuarantee
  | MortgageGuarantee
  | PersonalGuarantee
  | RealEstateGuarantee
  | VehicleGuarantee
> {
  try {
    // Make the PUT request based on the guarantee type and id
    const response = await instance.put<
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee
    >(`/api/guarantees/type_${type.toLowerCase()}/${id}`, guarantee);
    console.log("Updated guarantee:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update guarantee: ${error}`);
  }
}
