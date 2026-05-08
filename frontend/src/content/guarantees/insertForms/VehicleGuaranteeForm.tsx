import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { VehicleGuarantee } from "src/models/guarantee/vehicleGuarantee";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function VehicleGuaranteeForm({ open, setOpen }) {
  const { createNewGuarantee, creditId } = useGuaranteeContext(); // Access guarantee data from context

  // Object to hold form values
  const initialFormValues: VehicleGuarantee = {
    id: 0,
    credit: { id: parseInt(creditId) }, // Constructing a proper Credit object
    vehicleBrand: "Ford",
    modelYear: 2018,
    registrationNumber: "XYZ4523",
    fuelType: "Diesel",
    fiscalHorsepower: 0,
    type: "Vehicle",
  };

  const [formValues, setFormValues] =
    React.useState<VehicleGuarantee>(initialFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Ensure value is within the desired range
    if (name === "modelYear" && parseInt(value) > 2100) {
      // If value is outside the range, don't update the state
      return;
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCreateNewVehicleGuarantee() {
    createNewGuarantee(formValues, "vehicle");
    handleClose();
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Nouvelle Garantie Véhiculaire</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* -------------------------------------- */}
        <DialogContent dividers>
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <TextField
                id="vehicleBrand"
                name="vehicleBrand"
                label="Marque du véhicule"
                value={formValues.vehicleBrand}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="modelYear"
                name="modelYear"
                label="Année du modèle"
                value={formValues.modelYear}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="registrationNumber"
                name="registrationNumber"
                label="Numéro d'immatriculation"
                value={formValues.registrationNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fuelType"
                name="fuelType"
                label="Type de carburant"
                value={formValues.fuelType}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fiscalHorsepower"
                name="fiscalHorsepower"
                label="Puissance fiscale"
                value={formValues.fiscalHorsepower}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        {/* -------------------------------------- */}
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            onClick={() => {
              handleCreateNewVehicleGuarantee();
            }}
          >
            Enregistrer
          </Button>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
