import { Card } from "@mui/material";
import CasesTable from "./CasesTable";
import { useContext, useEffect } from "react";
import { getFilteredCasesByKeyWord } from "src/utils/api/case/caseApiCall";
import { CaseContext } from "src/contexts/CaseContext";
import { getAuthUser, setAuthUser } from "src/auth/authUser";
import { UserContext } from "src/contexts/UserContext";

interface ExistingCasesProps {
  selectedStatusId: number;
  setSelectedStatusId: React.Dispatch<React.SetStateAction<number>>;
  searchkeyWord: string;
  setSearchkeyWord: React.Dispatch<React.SetStateAction<string>>;
}

function ExistingCases({
  selectedStatusId,
  setSelectedStatusId,
  searchkeyWord,
  setSearchkeyWord,
}: ExistingCasesProps) {
  const { cases, setCases, fetchCases } = useContext(CaseContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if(currentUser?.id>0){
      console.log("call the fetch cases")
       fetchCases();
    }
  }, [currentUser]);

  async function searchCasesByKeyWord(keyword: string) {
    setCases([]);
    try {
      const result = await getFilteredCasesByKeyWord(keyword, selectedStatusId);
      console.log("searchCasesByKeyWord");
      setCases(result);
      console.log(result);
    } catch (error) {
      // Handle error
      console.error("Error fetching cases by keyword:", error);
    }
  }

  return (
    <Card>
      {cases && (
        <CasesTable
          searchCasesByKeyWord={searchCasesByKeyWord}
          setSelectedStatusId={setSelectedStatusId}
          searchkeyWord={searchkeyWord}
          setSearchkeyWord={setSearchkeyWord}
        />
      )}
    </Card>
  );
}

export default ExistingCases;
