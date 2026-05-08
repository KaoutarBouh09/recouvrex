import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { Case } from "src/models/case";
import { downloadExcel } from "src/utils/download/case/caseDownload";
import { filterThirdPartyUsingOneArg } from "src/utils/api/client/ClientApi";
import ClientFilterPopUp from "./UsersFilterPopUp";
import { filterUsersUsingOneArg } from "src/utils/api/user/userApi";
import RefreshIcon from '@mui/icons-material/Refresh';
// import { FC } from 'react';


const UserSearch = ({setRows,rows}) => {
     

   const [searchkeyWord ,setSearchkeyWord] = useState("");



    const  searchUsersByKeyWord = async(searchkeyWord)=> {

        try {

            const result = await filterUsersUsingOneArg(searchkeyWord);
               setRows(result);
        } catch (error) {
              console.log(error);
        }

    }

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
            searchUsersByKeyWord(searchkeyWord);
          }
        }}
        value={searchkeyWord}
        size="small"
        fullWidth
        placeholder="Chercher Agent de recouvrement"
        id="fullWidth"
        sx={{ mr: 1, pt: 0, mt: 0 }} // Margin for the TextField
      />
      <Box>
        <Tooltip arrow title="Search">
          <IconButton
            color="primary"
            onClick={() => {
              searchUsersByKeyWord(searchkeyWord);
            }}
          >
            <SearchIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
         <ClientFilterPopUp setRows={setRows}/>
      </Box>
      <Box width={"100%"} display={"flex"} justifyContent={"end"} marginInline={2}>
      <Tooltip arrow title="Refreche les Agents" onClick={()=>{searchUsersByKeyWord("")}}>
          <IconButton >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default UserSearch;
