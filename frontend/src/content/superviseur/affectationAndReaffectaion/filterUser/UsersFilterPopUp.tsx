import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import {  useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ThirdPartyFiltres } from "src/models/ThirdPartyFiltres";
import { getThirdPartyByMultiFilters } from "src/utils/api/client/ClientApi";
import { UserFilters } from "src/models/UserFilters";
import { filterUsersUsingMultiCriteria } from "src/utils/api/user/userApi";

function UsersFilterPopUp({setRows}) {
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
  const areFiltersEmpty = (filters:UserFilters) => {
    for (const key in filters) {
      if (filters[key] !== "") {
        return false;
      }
    }
    return true;
  };

    const filterUsersByMultiFilters = async(filters:UserFilters)=>{
        console.log("filters  ==> : ",filters)
        if(areFiltersEmpty(filters)){
              setAreEmpty(true);
              return null;
        } 
        setAreEmpty(false);
        try {
            const result =await filterUsersUsingMultiCriteria(filters);
            setRows(result);
            setOpen(false);
        } catch (error) {
             console.log(error)
        }
            
    }

  const [filters, setFilters] = useState<UserFilters>({
    userId: "",
    firstnameUser: "",
    lastnameUser: "",
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
      <Tooltip arrow title="Filter User">
          <IconButton ref={ref} onClick={handleOpen}>
            <FilterListIcon />
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
       
      >
      
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
            Filtrer les Agents 
          </Typography>
          <TextField
            name="userId"
            size="small"
            label="Identifiant Agent"
            variant="standard"
            value={filters.userId}
            onChange={handleInputChange}
          />
          <TextField
            name="lastnameUser"
            size="small"
            label="Nom Agent"
            variant="standard"
            value={filters.lastnameUser}
            onChange={handleInputChange}
          />
          <TextField
            name="firstnameUser"
            size="small"
            label="Prénom Agent"
            variant="standard"
            value={filters.firstnameUser}
            onChange={handleInputChange}
          />
         
         
          
          <Button
            onClick={() => {
              filterUsersByMultiFilters(filters);
              
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

export default UsersFilterPopUp;
