// Import statements for React and necessary dependencies
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { BusinessFundGuarantee } from "src/models/guarantee/businessFundGuarantee";
import { GuaranteesByTypeDTO } from "src/models/guarantee/guaranteesByTypeDTO";
import { MortgageGuarantee } from "src/models/guarantee/mortgageGuarantee";
import { PersonalGuarantee } from "src/models/guarantee/personalGuarantee";
import { RealEstateGuarantee } from "src/models/guarantee/realEstateGuarantee";
import { VehicleGuarantee } from "src/models/guarantee/vehicleGuarantee";
import {
  getAllGuaranteesByCreditId,
  createGuarantee,
  updateGuarantee, // Import the updateGuarantee function
} from "src/utils/api/guarantee/guaranteeApiCall";

// Define the type for guarantees
export interface Guarantee {
  // Define your guarantee properties here
}

// Define the type for the context
interface GuaranteeContextType {
  guarantees: GuaranteesByTypeDTO | null;
  setCreditId: (id: string) => void; // Add setCreditId function
  creditId:string; 
  fetchGuarantees: () => void;
  createNewGuarantee: (
    guarantee:
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee,
    type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
  ) => Promise<void>;
  updateExistingGuarantee: (
    id: number,
    guarantee:
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee,
    type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
  ) => Promise<void>; // Define the function signature
}

// Create the context
export const GuaranteeContext = createContext<GuaranteeContextType>({
  guarantees: null,
  setCreditId: () => {}, // Initialize the function
  creditId:"",
  fetchGuarantees: () => {},
  createNewGuarantee: async () => {},
  updateExistingGuarantee: async () => {}, // Initialize the function
});

// Create a provider component
export const GuaranteeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to hold guarantees data
  const [creditId, setCreditId] = useState<string>("");
  const [guarantees, setGuarantees] = useState<GuaranteesByTypeDTO | null>(
    null
  );

  // Function to fetch guarantees data
  const fetchGuarantees = async () => {
    try {
      // Fetch guarantees data from API
      const data = await getAllGuaranteesByCreditId(creditId);
      // Update guarantees state
      if (data) {
        setGuarantees(data);
      }
    } catch (error) {
      // Handle errors here if needed
      console.error("Failed to fetch guarantees:", error);
    }
  };

  // Function to create a new guarantee
  const createNewGuarantee = async (
    guarantee:
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee,
    type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
  ) => {
    try {
      // Call the createGuarantee API function
      await createGuarantee(guarantee, type);
      // After creating the guarantee, fetch updated guarantees data
      fetchGuarantees();
    } catch (error) {
      // Handle errors here if needed
      console.error("Failed to create guarantee:", error);
    }
  };

  // Function to update an existing guarantee
  const updateExistingGuarantee = async (
    id: number,
    guarantee:
      | BusinessFundGuarantee
      | MortgageGuarantee
      | PersonalGuarantee
      | RealEstateGuarantee
      | VehicleGuarantee,
    type: "business_fund" | "mortgage" | "personal" | "real_estate" | "vehicle"
  ) => {
    try {
      // Call the updateGuarantee API function
      await updateGuarantee(id, guarantee, type);
      // After updating the guarantee, fetch updated guarantees data
      fetchGuarantees();
    } catch (error) {
      // Handle errors here if needed
      console.error("Failed to update guarantee:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (creditId.length > 0) {
      fetchGuarantees();
    }
  }, [creditId]);

  // Expose the context value
  const contextValue: GuaranteeContextType = {
    guarantees,
    fetchGuarantees,
    createNewGuarantee,
    updateExistingGuarantee,
    setCreditId,
    creditId,
  };

  // Provide the context to its children
  return (
    <GuaranteeContext.Provider value={contextValue}>
      {children}
    </GuaranteeContext.Provider>
  );
};

// Custom hook to consume the context
export const useGuaranteeContext = () => useContext(GuaranteeContext);
