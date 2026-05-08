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
import { BusinessFundGuarantee } from "src/models/guarantee/businessFundGuarantee";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Define type for props
interface BusinessFundGuaranteeFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: BusinessFundGuarantee;
}

const BusinessFundGuaranteeForm: React.FC<BusinessFundGuaranteeFormProps> = ({ open, setOpen, initialValues }) => {
  const { updateExistingGuarantee } = useGuaranteeContext(); // Access guarantee data from context
  const [formValues, setFormValues] = React.useState<BusinessFundGuarantee>(initialValues);

  React.useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdateBusinessFundGuarantee() {
    updateExistingGuarantee(initialValues.id, formValues, "business_fund");
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
          <Typography variant="h3">Modifier Garantie Fonds de Commerce</Typography>
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
                label="Nom et prénom du propriétaire (Personne physique)"
                value={formValues.ownerFullName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="corporateName"
                name="corporateName"
                label="Raison sociale de la Société"
                value={formValues.corporateName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="socialCapital"
                name="socialCapital"
                label="Capital social"
                value={formValues.socialCapital}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="commerceRegistryNumber"
                name="commerceRegistryNumber"
                label="N° du Registre de Commerce"
                value={formValues.commerceRegistryNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="commerceRegistryCity"
                name="commerceRegistryCity"
                label="Ville du Registre de Commerce"
                value={formValues.commerceRegistryCity}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="managerFullName"
                name="managerFullName"
                label="Nom et prénom du Gérant"
                value={formValues.managerFullName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="managerNationalIDCard"
                name="managerNationalIDCard"
                label="CIN du Gérant"
                value={formValues.managerNationalIDCard}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="tradeName"
                name="tradeName"
                label="Dénomination du fond de commerce"
                value={formValues.tradeName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="pledgeRank"
                name="pledgeRank"
                label="Rang de nantissement"
                value={formValues.pledgeRank}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="pledgeRealizationDate"
                name="pledgeRealizationDate"
                label="Date de concrétisation du nantissement"
                value={formValues.pledgeRealizationDate}
                onChange={handleChange}
                fullWidth
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="pledgeExpirationDate"
                name="pledgeExpirationDate"
                label="Date d'expiration du natissement"
                value={formValues.pledgeExpirationDate}
                onChange={handleChange}
                fullWidth
                type="date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            onClick={handleUpdateBusinessFundGuarantee}
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

export default BusinessFundGuaranteeForm;
