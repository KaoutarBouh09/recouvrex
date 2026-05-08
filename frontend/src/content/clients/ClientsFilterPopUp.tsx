import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import {  useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { ThirdPartyFiltres } from "src/models/ThirdPartyFiltres";
import { getThirdPartyByMultiFilters } from "src/utils/api/client/ClientApi";

function ClientFilterPopUp({setThirdParties}) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [areEmpty, setAreEmpty] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setAreEmpty(false);
  };
     // Function to check if all fields in filters are empty
  const areFiltersEmpty = (filters:ThirdPartyFiltres) => {
    for (const key in filters) {
      if (filters[key] !== "") {
        return false;
      }
    }
    return true;
  };

    const filterThirdPartyByMultiFilters = async(filters:ThirdPartyFiltres)=>{
        console.log("filters  ==> : ",filters)
        if(areFiltersEmpty(filters)){
              setAreEmpty(true);
              return null;
        } 
        setAreEmpty(false);
        try {
            const result =await getThirdPartyByMultiFilters(filters);
            setThirdParties(result);
            setOpen(false);
        } catch (error) {
             console.log(error)
        }
            
    }

  const [filters, setFilters] = useState<ThirdPartyFiltres>({
    thirdPartyId: "",
    personalEmail: "",
    firstnameThird: "",
    lastnameThird: "",
    clientType: "",
    professionalEmail: "",
    companyName: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Tooltip arrow title="Filtre">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <SortIcon />
        </IconButton>
      </Tooltip>
      <Popover
       
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
       

        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}

          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              marginTop:120
            },
          }}
      >
        {/* <CasesFilter handleFilterCases={handleFilterCases} setOpen={setOpen}  /> */}
      
        <Box
        
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            maxWidth: "840px",
            m: 2,
            
          }}
          noValidate
          autoComplete="off"
          >
          <Typography variant="h3" gutterBottom>
            Filter Clients 
          </Typography>
          <TextField
            name="thirdPartyId"
            size="small"
            label="Identifiant client"
            variant="standard"
            value={filters.thirdPartyId}
            onChange={handleInputChange}
          />
          <TextField
            name="lastnameThird"
            size="small"
            label="Nom client"
            variant="standard"
            value={filters.lastnameThird}
            onChange={handleInputChange}
          />
          <TextField
            name="firstnameThird"
            size="small"
            label="Prénom client"
            variant="standard"
            value={filters.firstnameThird}
            onChange={handleInputChange}
          />
          <TextField
            name="clientType"
            size="small"
            label="type de client"
            variant="standard"
            value={filters.clientType}
            onChange={handleInputChange}
          />
          <TextField
            name="personalEmail"
            size="small"
            label="Email personnel"
            variant="standard"
            value={filters.personalEmail}
            onChange={handleInputChange}
          />
          <TextField
            name="professionalEmail"
            size="small"
            label="Email professionel"
            variant="standard"
            value={filters.professionalEmail}
            onChange={handleInputChange}
          />
          <TextField
            name="companyName"
            size="small"
            label="raison social"
            variant="standard"
            value={filters.companyName}
            onChange={handleInputChange}
          />
          
          <Button
            onClick={() => {
                filterThirdPartyByMultiFilters(filters);
              
            }}
            variant="contained"
          >
            Appliquer
          </Button>
          {areEmpty?
          <Typography variant="h3" gutterBottom color={"red"} textAlign={"center"}>
            Tous les champs sont vide !
          </Typography>
          :null}
        </Box>
      </Popover>
    </>
  );
}

export default ClientFilterPopUp;
