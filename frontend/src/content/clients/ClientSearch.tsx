import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { Case } from "src/models/case";
import { downloadExcel } from "src/utils/download/case/caseDownload";
import { filterThirdPartyUsingOneArg } from "src/utils/api/client/ClientApi";

// import { FC } from 'react';


const ClientSearch = ({setThirdParties,thirdParties}) => {
     

   const [searchkeyWord ,setSearchkeyWord] = useState("");



    const  searchCasesByKeyWord = async()=> {

        try {

            const result = await filterThirdPartyUsingOneArg(searchkeyWord);
               setThirdParties(result);
        } catch (error) {
              console.log(error);
        }

    }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 800,
        maxWidth: "100%",
        m: 1,
        pt: 0,
        mt: 0,
      }}
    >
      <TextField
        onChange={(e) => {
          setSearchkeyWord(e.target.value);
        }}
        value={searchkeyWord}
        size="small"
        fullWidth
        placeholder="Tapez pour filtrer ou appuyez sur Entrée pour rechercher la base de données"
        id="fullWidth"
        sx={{ mr: 1, pt: 0, mt: 0 }} // Margin for the TextField
      />
      <Box>
        <Tooltip arrow title="Search">
          <IconButton
            color="primary"
            onClick={() => {
              searchCasesByKeyWord();
            }}
          >
            <SearchIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        {/* <Tooltip arrow title="Exel">
          <IconButton
            onClick={() => {
              downloadExcel(thirdParties);
            }}
            color="primary"
          >
            <img src="/exel-icon.png" width="20pt" height="25pt" alt="img" />
          </IconButton>
        </Tooltip> */}
      </Box>
    </Box>
  );
};

export default ClientSearch;
