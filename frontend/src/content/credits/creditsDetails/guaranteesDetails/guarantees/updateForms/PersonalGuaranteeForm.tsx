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
import { PersonalGuarantee } from "src/models/guarantee/personalGuarantee";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PersonalGuaranteeForm({ open, setOpen, initialValues }) {
  const { updateExistingGuarantee } = useGuaranteeContext();

  const [formValues, setFormValues] = React.useState<PersonalGuarantee>(initialValues);

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

  function handleUpdatePersonalGuarantee() {
    updateExistingGuarantee(initialValues.id, formValues, "personal");
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
          <Typography variant="h3">Modifier Caution Personnelle</Typography>
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
                id="guarantorLastName"
                name="guarantorLastName"
                label="Nom du garant"
                value={formValues.guarantorLastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorFirstName"
                name="guarantorFirstName"
                label="Prénom du garant"
                value={formValues.guarantorFirstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorPhoneNumber"
                name="guarantorPhoneNumber"
                label="Numéro de GSM"
                value={formValues.guarantorPhoneNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorNationalID"
                name="guarantorNationalID"
                label="Numéro de CIN"
                value={formValues.guarantorNationalID}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorIDExpirationDate"
                name="guarantorIDExpirationDate"
                label="Date d'expiration de la CIN"
                value={formValues.guarantorIDExpirationDate}
                onChange={handleChange}
                fullWidth
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="relationshipWithClient"
                name="relationshipWithClient"
                label="Nature du lien avec le client"
                value={formValues.relationshipWithClient}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorResidenceAddress"
                name="guarantorResidenceAddress"
                label="Adresse de Résidence"
                value={formValues.guarantorResidenceAddress}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorActivity"
                name="guarantorActivity"
                label="Activité"
                value={formValues.guarantorActivity}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorMonthlyIncome"
                name="guarantorMonthlyIncome"
                label="Revenu mensuel"
                value={formValues.guarantorMonthlyIncome}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorResidualIncome"
                name="guarantorResidualIncome"
                label="Revenu résiduel"
                value={formValues.guarantorResidualIncome}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="totalOutstandingInstallments"
                name="totalOutstandingInstallments"
                label="Total des échéances en cours"
                value={formValues.totalOutstandingInstallments}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="activitySeniority"
                name="activitySeniority"
                label="Ancienneté dans l'activité"
                value={formValues.activitySeniority}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorEmployer"
                name="guarantorEmployer"
                label="Employeur"
                value={formValues.guarantorEmployer}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="guarantorProfessionalAddress"
                name="guarantorProfessionalAddress"
                label="Adresse professionnelle"
                value={formValues.guarantorProfessionalAddress}
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
            onClick={handleUpdatePersonalGuarantee}
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
