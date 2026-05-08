import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { MortgageGuarantee } from "src/models/guarantee/mortgageGuarantee";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MortgageGuaranteeForm({ open, setOpen }) {
  const { createNewGuarantee, creditId } = useGuaranteeContext();

  // Object to hold form values
  // const initialFormValues: MortgageGuarantee = {
  //   id: 0,
  //   credit: { id: parseInt(creditId) },
  //   ownerFullName: "",
  //   ownerAddress: "",
  //   nationalIDCardNumber: "",
  //   landTitleName: "",
  //   landTitleNumber: "",
  //   mortgageRank: "",
  //   landRegistryOfficeName: "",
  //   mortgageLoanAmount: 0,
  //   mortgagedPropertyName: "",
  //   mortgagedPropertyArea: 0,
  //   constructionsDescription: "",
  //   registrationDate: new Date(),
  //   mortgageStatus: "",
  //   type: "Mortgage", // Assuming type needs to be set as "Mortgage"
  // };

  const initialFormValues: MortgageGuarantee = {
    id: 0,
    credit: { id: parseInt(creditId) },
    ownerFullName: "Alice Smith",
    ownerAddress: "123 Main Street, Pleasantville",
    nationalIDCardNumber: "ABC123XYZ",
    landTitleName: "Sunny Acres",
    landTitleNumber: "LTN123456789",
    mortgageRank: "First",
    landRegistryOfficeName: "Metropolitan Land Registry",
    mortgageLoanAmount: 300000,
    mortgagedPropertyName: "Sunnyvale Villa",
    mortgagedPropertyArea: 350.5,
    constructionsDescription: "Detached house with backyard",
    registrationDate: new Date("2023-09-10"),
    mortgageStatus: "Active",
    type: "Mortgage", // Assuming type needs to be set as "Mortgage"
  };

  const [formValues, setFormValues] =
    React.useState<MortgageGuarantee>(initialFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCreateNewMortgageGuarantee() {
    createNewGuarantee(formValues, "mortgage");
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
          <Typography variant="h3">Nouvelle Garantie Hypothécaire</Typography>
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
        <DialogContent dividers>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField
                id="ownerFullName"
                name="ownerFullName"
                label="Nom et prénom du propriétaire"
                value={formValues.ownerFullName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ownerAddress"
                name="ownerAddress"
                label="Adresse du propriétaire"
                value={formValues.ownerAddress}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nationalIDCardNumber"
                name="nationalIDCardNumber"
                label="N° CIN"
                value={formValues.nationalIDCardNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="landTitleName"
                name="landTitleName"
                label="Nom du titre foncier"
                value={formValues.landTitleName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="landTitleNumber"
                name="landTitleNumber"
                label="N° du titre foncier"
                value={formValues.landTitleNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mortgageRank"
                name="mortgageRank"
                label="Rang"
                value={formValues.mortgageRank}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="landRegistryOfficeName"
                name="landRegistryOfficeName"
                label="Nom de la conservation foncière"
                value={formValues.landRegistryOfficeName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mortgageLoanAmount"
                name="mortgageLoanAmount"
                label="Montant de prêt"
                value={formValues.mortgageLoanAmount}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mortgagedPropertyName"
                name="mortgagedPropertyName"
                label="Nom de la propriété"
                value={formValues.mortgagedPropertyName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mortgagedPropertyArea"
                name="mortgagedPropertyArea"
                label="Superficie"
                value={formValues.mortgagedPropertyArea}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="constructionsDescription"
                name="constructionsDescription"
                label="Description des constructions"
                value={formValues.constructionsDescription}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="registrationDate"
                name="registrationDate"
                label="Date d'inscription à la conservation"
                value={formValues.registrationDate}
                onChange={handleChange}
                fullWidth
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="mortgageStatus"
                name="mortgageStatus"
                label="Statut de l'hypothèque"
                value={formValues.mortgageStatus}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            onClick={() => {
              handleCreateNewMortgageGuarantee();
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
