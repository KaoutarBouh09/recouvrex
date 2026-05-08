import { IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MFilters } from "src/models/mfilters";
import { CaseContext } from "src/contexts/CaseContext";

function CasesFilterPopUp() {
  const { filterCasesByMultiFilters } = useContext(CaseContext);

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const [filters, setFilters] = useState<MFilters>({
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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
            Filter Cases
          </Typography>
          <TextField
            name="caseId"
            size="small"
            label="Identifiant cas"
            variant="standard"
            value={filters.caseId}
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
            name="lastnameUser"
            size="small"
            label="Nom utilisateur"
            variant="standard"
            value={filters.lastnameUser}
            onChange={handleInputChange}
          />
          <TextField
            name="firstnameUser"
            size="small"
            label="Prénom utilisateur"
            variant="standard"
            value={filters.firstnameUser}
            onChange={handleInputChange}
          />
          <TextField
            name="contractId"
            size="small"
            label="Identifiant contrat"
            variant="standard"
            value={filters.contractId}
            onChange={handleInputChange}
          />
          <TextField
            name="status"
            size="small"
            label="Statut"
            variant="standard"
            value={filters.status}
            onChange={handleInputChange}
          />
          <Button
            onClick={() => {
              filterCasesByMultiFilters(filters);
              setOpen(false);
            }}
            variant="contained"
          >
            Appliquer
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default CasesFilterPopUp;
