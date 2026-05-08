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
import { RealEstateGuarantee } from "src/models/guarantee/realEstateGuarantee";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RealEstateGuaranteeForm({ open, setOpen }) {
  const { createNewGuarantee, creditId } = useGuaranteeContext();

  // Object to hold form values
  // const initialFormValues: RealEstateGuarantee = {
  //   id: 0,
  //   credit: { id: parseInt(creditId) },
  //   ownerLastName: "",
  //   ownerFirstName: "",
  //   ownerAddress: "",
  //   ownerNationalID: "",
  //   landTitleName: "",
  //   landTitleNumber: "",
  //   purchaseDeed: "",
  //   rank: "",
  //   landRegistryName: "",
  //   loanAmount: 0,
  //   propertyName: "",
  //   area: 0,
  //   constructionDescription: "",
  //   registrationDate: new Date(),
  //   type: "RealEstate", // Assuming type needs to be set as "RealEstate"
  // };
  const initialFormValues: RealEstateGuarantee = {
    id: 0,
    credit: { id: parseInt(creditId) },
    ownerLastName: "Smith",
    ownerFirstName: "John",
    ownerAddress: "456 Elm Street, Springfield",
    ownerNationalID: "ABC456XYZ",
    landTitleName: "Sunny Acres",
    landTitleNumber: "LTN987654321",
    purchaseDeed: "Deed123",
    rank: "First",
    landRegistryName: "Metropolitan Land Registry",
    loanAmount: 500000,
    propertyName: "Sunnyvale Villa",
    area: 250.75,
    constructionDescription: "Detached house with backyard",
    registrationDate: new Date("2023-10-15"),
    type: "RealEstate", // Assuming type needs to be set as "RealEstate"
  };

  const [formValues, setFormValues] =
    React.useState<RealEstateGuarantee>(initialFormValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCreateNewRealEstateGuarantee() {
    createNewGuarantee(formValues, "real_estate");
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
          <Typography variant="h3">Nouvelle Garantie Immobilière</Typography>
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
            <Grid item xs={6}>
              <TextField
                id="ownerLastName"
                name="ownerLastName"
                label="Nom du propriétaire"
                value={formValues.ownerLastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ownerFirstName"
                name="ownerFirstName"
                label="Prénom du propriétaire"
                value={formValues.ownerFirstName}
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
                id="ownerNationalID"
                name="ownerNationalID"
                label="N° CIN"
                value={formValues.ownerNationalID}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="landTitleName"
                name="landTitleName"
                label="Nom du titre foncier"
                value={formValues.landTitleName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="landTitleNumber"
                name="landTitleNumber"
                label="N° du titre foncier"
                value={formValues.landTitleNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="purchaseDeed"
                name="purchaseDeed"
                label="Acte d'achat"
                value={formValues.purchaseDeed}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="rank"
                name="rank"
                label="Rang"
                value={formValues.rank}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="landRegistryName"
                name="landRegistryName"
                label="Nom de la conservation foncière"
                value={formValues.landRegistryName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="loanAmount"
                name="loanAmount"
                label="Montant de prêt"
                value={formValues.loanAmount}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="propertyName"
                name="propertyName"
                label="Nom de la propriété"
                value={formValues.propertyName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="area"
                name="area"
                label="Superficie"
                value={formValues.area}
                onChange={handleChange}
                fullWidth
                type="number"
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
            <Grid item xs={12}>
              <TextField
                id="constructionDescription"
                name="constructionDescription"
                label="Description des constructions"
                value={formValues.constructionDescription}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
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
              handleCreateNewRealEstateGuarantee();
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
