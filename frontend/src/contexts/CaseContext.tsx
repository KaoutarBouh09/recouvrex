import { createContext, FC, ReactNode, useState } from "react";
import { Case } from "src/models/case";
import { MFilters } from "src/models/mfilters";
import { getCasesByMultiFilters, getFilteredCasesByUser } from "src/utils/api/case/caseApiCall";

// Define the context type
type CaseContextType = {
  cases: Case[];
  setCases: (cases: Case[]) => void;
  fetchCases: () => void;
  filterCasesByMultiFilters: (filters:MFilters) => void;
  selectedCase: Case | null; // Adjusted type to include null
  setSelectedCase: (selectedCases: Case | null) => void; // Adjusted type to include null
};

// Create the case context
export const CaseContext = createContext<CaseContextType>({
  cases: [],
  setCases: () => {},
  fetchCases: () => {},
  filterCasesByMultiFilters: () => {},
  selectedCase: null, // Default to null
  setSelectedCase: () => {},
});

// Define the props for the provider component
interface CaseProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const CaseProvider: FC<CaseProviderProps> = ({ children }) => {
  // State to hold case data
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null); // Adjusted state type

  const fetchCases = async () => {
    try {
      const result = await getFilteredCasesByUser();
      setCases(result);
    } catch (error) {
      // Handle error
      console.error("Error fetching cases for user by userId:", error);
    }
  };

  
  const filterCasesByMultiFilters = async (filters:MFilters) => {
    setCases([]);
    try {
        const result = await getCasesByMultiFilters(filters);
        if(result){
          setCases(result)
        }
        console.log("Filtered cases: ", result);
        // setCases(result);
    } catch (error) {
        console.error("Error filtering cases by many filters:", error);
    }
};

  return (
    <CaseContext.Provider
      value={{ cases, setCases, fetchCases,filterCasesByMultiFilters, selectedCase, setSelectedCase }}
    >
      {children}
    </CaseContext.Provider>
  );
};
