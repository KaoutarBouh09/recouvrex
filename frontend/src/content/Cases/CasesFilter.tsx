import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MFilters } from "src/models/mfilters";

interface CasesFilterProps {
  handleFilterCases: (filters: MFilters) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CasesFilter({
  handleFilterCases,
  setOpen,
}: CasesFilterProps) {
  const [filters, setFilters] = React.useState<MFilters>({
    caseId: "",
    status: "",
    firstnameThird: "",
    lastnameThird: "",
    firstnameUser: "",
    lastnameUser: "",  
    contractId: "",
    statusUser: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        maxWidth: "840px",
        m:2,
        mb:3
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="caseId"
        size="small"
        label="Identifiant cas"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="lastnameThird"
        size="small"
        label="Nom client"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="firstnameThird"
        size="small"
        label="Prénom client"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="lastnameUser"
        size="small"
        label="Nom utilisateur"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="firstnameUser"
        size="small"
        label="Prénom utilisateur"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="contractId"
        size="small"
        label="Identifiant contrat"
        variant="standard"
        onChange={handleInputChange}
      />
      <TextField
        name="status"
        size="small"
        label="Statut"
        variant="standard"
        onChange={handleInputChange}
      />
      <Button
        onClick={() => {
          handleFilterCases(filters);
          setOpen(false);
        }}
        variant="contained"
      >
        Appliquer
      </Button>
    </Box>
  );
}
