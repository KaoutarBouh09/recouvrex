import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { Case } from "src/models/case";
import { downloadExcel } from "src/utils/download/case/caseDownload";
import CasesFilterPopUp from "./CasesFilterPopUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from '@mui/icons-material/Refresh';
const CasesSearch = ({ searchCasesByKeyWord, setRows, setCasesSelected }) => {
  const [searchkeyWord, setSearchkeyWord] = useState<string>("");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "100%",
        m: 1,
        pt: 1,
        mt: 0,
      }}
    >
      <TextField
        onChange={(e) => {
          setSearchkeyWord(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            searchCasesByKeyWord(searchkeyWord);
          }
        }}
        value={searchkeyWord}
        size="small"
        fullWidth
        placeholder="Cherccher case "
        id="fullWidth"
        sx={{ mr: 1, pt: 0, mt: 0 }} // Margin for the TextField
      />
      <Box>
        <Tooltip arrow title="Search">
          <IconButton
            color="primary"
            onClick={() => {
              searchCasesByKeyWord(searchkeyWord);
            }}
          >
            <SearchIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <CasesFilterPopUp
          setRows={setRows}
          setCasesSelected={setCasesSelected}
        />
       
      </Box>
      <Box width={"100%"} display={"flex"} justifyContent={"end"} marginInline={2}>
      <Tooltip arrow title="Refreche les cases" onClick={()=>{searchCasesByKeyWord("")}}>
          <IconButton >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
    </Box>
  );
};

export default CasesSearch;
