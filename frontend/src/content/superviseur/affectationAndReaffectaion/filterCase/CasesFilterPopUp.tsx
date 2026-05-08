import { Autocomplete, Grid, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MFilters } from "src/models/mfilters";
import { CaseContext } from "src/contexts/CaseContext";
import { getCasesByMultiFilters } from "src/utils/api/case/caseApiCall";
import FilterListIcon from "@mui/icons-material/FilterList";

function CasesFilterPopUp({ setRows, setCasesSelected }) {
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>,
    value?: string | null
  ) => {
    if (value !== undefined) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        statusUser: value || ""
      }));
    } else {
      const target = event.target as HTMLInputElement;
      const { name, value } = target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  const filterCasesByMultiFilters = async () => {
    setCasesSelected([]);
    try {
      const result = await getCasesByMultiFilters(filters);
      if (result) {
        setRows(result);
      }
      console.log("Filtered cases: ", result);
    } catch (error) {
      console.error("Error filtering cases by many filters:", error);
    }
  };

  return (
    // <>
    //   <Tooltip arrow title="Filter User">
    //     <IconButton ref={ref} onClick={handleOpen}>
    //       <FilterListIcon />
    //     </IconButton>
    //   </Tooltip>
    //   <Popover
    //     anchorEl={ref.current}
    //     onClose={handleClose}
    //     open={isOpen}
    //     anchorOrigin={{
    //       vertical: "bottom",
    //       horizontal: "center",
    //     }}
    //     transformOrigin={{
    //       vertical: "bottom",
    //       horizontal: "center",
    //     }}
    //     style={{ marginTop: "150px" }}
    //   >
    //     <Box
    //       component="form"
    //       sx={{
    //         "& > :not(style)": { m: 1, width: "25ch" },
    //         maxWidth: "840px",
    //       }}
    //       noValidate
    //       autoComplete="off"
    //     >
    //       <Typography variant="h3" gutterBottom>
    //         Filter Cases
    //       </Typography>
    //       <TextField
    //         name="caseId"
    //         size="small"
    //         label="Identifiant cas"
    //         variant="standard"
    //         value={filters.caseId}
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         name="lastnameThird"
    //         size="small"
    //         label="Nom client"
    //         variant="standard"
    //         value={filters.lastnameThird}
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         name="firstnameThird"
    //         size="small"
    //         label="Prénom client"
    //         variant="standard"
    //         value={filters.firstnameThird}
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         name="lastnameUser"
    //         size="small"
    //         label="Nom utilisateur"
    //         variant="standard"
    //         value={filters.lastnameUser}
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         name="firstnameUser"
    //         size="small"
    //         label="Prénom utilisateur"
    //         variant="standard"
    //         value={filters.firstnameUser}
    //         onChange={handleInputChange}
    //       />
    //       <Autocomplete
    //         options={['ACTIVE', 'INACTIVE']}
    //         getOptionLabel={(option) => option}
    //         value={filters.statusUser}
    //         onChange={(event, value) => handleInputChange(event, value)}
    //         renderInput={(params) => (
    //           <TextField
    //             {...params}
    //             name="statusUser"
    //             size="small"
    //             label="User status"
    //             variant="standard"
    //           />
    //         )}
    //       />
    //       <TextField
    //         name="contractId"
    //         size="small"
    //         label="Identifiant contrat"
    //         variant="standard"
    //         value={filters.contractId}
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         name="status case"
    //         size="small"
    //         label="Statut"
    //         variant="standard"
    //         value={filters.status}
    //         onChange={handleInputChange}
    //       />
    //       <Button
    //         onClick={() => {
    //           filterCasesByMultiFilters();
    //           setOpen(false);
    //         }}
    //         variant="contained"
    //       >
    //         Appliquer
    //       </Button>
    //     </Box>
    //   </Popover>
    // </>
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
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        sx: { p: 3, maxWidth: '600px' }
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mb: 2, width: "100%" },
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" gutterBottom>
          Filter Cases
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="caseId"
              size="small"
              label="Identifiant cas"
              variant="outlined"
              value={filters.caseId}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastnameThird"
              size="small"
              label="Nom client"
              variant="outlined"
              value={filters.lastnameThird}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstnameThird"
              size="small"
              label="Prénom client"
              variant="outlined"
              value={filters.firstnameThird}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastnameUser"
              size="small"
              label="Nom utilisateur"
              variant="outlined"
              value={filters.lastnameUser}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstnameUser"
              size="small"
              label="Prénom utilisateur"
              variant="outlined"
              value={filters.firstnameUser}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={['ACTIVE', 'INACTIVE']}
              getOptionLabel={(option) => option}
              value={filters.statusUser}
              onChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="statusUser"
                  size="small"
                  label="User status"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="contractId"
              size="small"
              label="Identifiant contrat"
              variant="outlined"
              value={filters.contractId}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="status"
              size="small"
              label="Statut"
              variant="outlined"
              value={filters.status}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              filterCasesByMultiFilters();
              setOpen(false);
            }}
            variant="contained"
            color="primary"
          >
            Appliquer
          </Button>
        </Box>
      </Box>
    </Popover>
  </>
  );
}

export default CasesFilterPopUp;
