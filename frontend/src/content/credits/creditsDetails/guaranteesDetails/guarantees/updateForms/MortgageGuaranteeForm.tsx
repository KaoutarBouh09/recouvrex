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

export default function MortgageGuaranteeForm({ open, setOpen, initialValues }) {
  const { updateExistingGuarantee } = useGuaranteeContext();

  const [formValues, setFormValues] = React.useState<MortgageGuarantee>(initialValues);

  React.useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdateMortgageGuarantee() {
    updateExistingGuarantee(initialValues.id, formValues, "mortgage");
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
          <Typography variant="h3">Modifier Garantie Hypothécaire</Typography>
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
            onClick={handleUpdateMortgageGuarantee}
          >
            Modifier
          </Button>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
