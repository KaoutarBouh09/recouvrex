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
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";

import { useState, useEffect } from "react";
import {
  createNewDueDate,
  updateDueDate,
} from "src/utils/api/dueDate/DueDateApi";
import { getFilteredCasesByCaseId } from "src/utils/api/case/caseApiCall";
import { DueDate, DueDateInterface } from "src/models/DueDate";
import Alert from "@mui/material/Alert";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useTheme } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { CaseContext } from "src/contexts/CaseContext";
import { formatDate } from "src/utils/formatDate/CurrentDateTime";
import { updateClient } from "src/utils/api/client/ClientApi";
import { ThirdParty } from "src/models/ThirdParty";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface EditClientProps {
  setIsNewFactOpen: any;
  client:ThirdParty
}
export default function EditClient({
  setIsNewFactOpen,
  client
}: EditClientProps) {

  
  const themeTable = useTheme();
  const [open, setOpen] = React.useState(false);
     ////////////////////////
 //TextField states
  const [thirdPartyId, setThirdPartyId] = useState("");
  const [tiersType, setTiersType] = useState("");
  const [title, setTitle] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [businessSector, setBusinessSector] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [occupation, setOccupation] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [privatePhone, setPrivatePhone] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [landLinePhone, setLandLinePhone] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [commercialRegister, setCommercialRegister] = useState("");
  const [supportingDocumentType, setSupportingDocumentType] = useState("");
  const [supportingDocumentNumber, setSupportingDocumentNumber] = useState("");
  const [
    supportingDocumentExpirationDate,
    setSupportingDocumentExpirationDate,
  ] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [user, setUser] = useState({});
  //TextField ERRORS
  const [tiersTypeError, setTiersTypeError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [countryOfResidenceError, setCountryOfResidenceError] = useState(false);
  const [businessSectorError, setBusinessSectorError] = useState(false);
  const [legalFormError, setLegalFormError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [personalEmailError, setPersonalEmailError] = useState(false);
  const [businessEmailError, setBusinessEmailError] = useState(false);
  const [privatePhoneError, setPrivatePhoneError] = useState(false);
  const [businessPhoneError, setBusinessPhoneError] = useState(false);
  const [landLinePhoneError, setLandLinePhoneError] = useState(false);
  const [faxNumberError, setFaxNumberError] = useState(false);
  const [commercialRegisterError, setCommercialRegisterError] = useState(false);
  const [supportingDocumentTypeError, setSupportingDocumentTypeError] =
    useState(false);
  const [supportingDocumentNumberError, setSupportingDocumentNumberError] =
    useState(false);
  const [
    supportingDocumentExpirationDateError,
    setSupportingDocumentExpirationDateError,
  ] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);

     /////////////////////////

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetFields = () => {
    setTiersType("");
    setTitle("");
    setLastName("");
    setFirstName("");
    setCompanyName("");
    setBirthDate("");
    setNationality("");
    setCountryOfResidence("");
    setBusinessSector("");
    setLegalForm("");
    setOccupation("");
    setPersonalEmail("");
    setBusinessEmail("");
    setPrivatePhone("");
    setBusinessPhone("");
    setLandLinePhone("");
    setFaxNumber("");
    setCommercialRegister("");
    setSupportingDocumentType("");
    setSupportingDocumentNumber("");
    setSupportingDocumentExpirationDate("");
    setMaritalStatus("");
   // setUser({});

    setTiersTypeError(false);
    setTitleError(false);
    setLastNameError(false);
    setFirstNameError(false);
    setCompanyNameError(false);
    setBirthDateError(false);
    setNationalityError(false);
    setCountryOfResidenceError(false);
    setBusinessSectorError(false);
    setLegalFormError(false);
    setOccupationError(false);
    setPersonalEmailError(false);
    setBusinessEmailError(false);
    setPrivatePhoneError(false);
    setBusinessPhoneError(false);
    setLandLinePhoneError(false);
    setFaxNumberError(false);
    setCommercialRegisterError(false);
    setSupportingDocumentTypeError(false);
    setSupportingDocumentNumberError(false);
    setSupportingDocumentExpirationDateError(false);
    setMaritalStatusError(false);
  };
  
  const initializeStateFromObject = (client:ThirdParty) => {
    setTiersType(client.tiersType);
    setTitle(client.title);
    setLastName(client.lastName);
    setFirstName(client.firstName);
    setCompanyName(client.companyName);
    setBirthDate(client.birthDate);
    setNationality(client.nationality);
    setCountryOfResidence(client.countryOfResidence);
    setBusinessSector(client.businessSector);
    setLegalForm(client.legalForm);
    setOccupation(client.occupation);
    setPersonalEmail(client.personalEmail);
    setBusinessEmail(client.businessEmail);
    setPrivatePhone(client.privatePhone);
    setBusinessPhone(client.businessPhone);
    setLandLinePhone(client.landLinePhone);
    setFaxNumber(client.faxNumber );
    setCommercialRegister(client.commercialRegister);
    setSupportingDocumentType(client.supportingDocumentType);
    setSupportingDocumentNumber(client.supportingDocumentNumber);
    setSupportingDocumentExpirationDate(client.supportingDocumentExpirationDate);
    setMaritalStatus(client.maritalStatus);
 

    setTiersTypeError(false);
    setTitleError(false);
    setLastNameError(false);
    setFirstNameError(false);
    setCompanyNameError(false);
    setBirthDateError(false);
    setNationalityError(false);
    setCountryOfResidenceError(false);
    setBusinessSectorError(false);
    setLegalFormError(false);
    setOccupationError(false);
    setPersonalEmailError(false);
    setBusinessEmailError(false);
    setPrivatePhoneError(false);
    setBusinessPhoneError(false);
    setLandLinePhoneError(false);
    setFaxNumberError(false);
    setCommercialRegisterError(false);
    setSupportingDocumentTypeError(false);
    setSupportingDocumentNumberError(false);
    setSupportingDocumentExpirationDateError(false);
    setMaritalStatusError(false);
  
  }
 
  useEffect(() => {
    if (client) {
      initializeStateFromObject(client);
    }
  }, [open]);
  
const checkEmptyInputs = () => {
  let isError = false;

  // Check each input and set its error state if empty
  if (tiersType === "") {
    setTiersTypeError(true);
    isError = true;
  }

  if (title === "") {
    setTitleError(true);
    isError = true;
  }

  if (lastName === "") {
    setLastNameError(true);
    isError = true;
  }

  if (firstName === "") {
    setFirstNameError(true);
    isError = true;
  }

  if (companyName === "") {
    setCompanyNameError(true);
    isError = true;
  }

  if (birthDate === "") {
    setBirthDateError(true);
    isError = true;
  }

  if (nationality === "") {
    setNationalityError(true);
    isError = true;
  }

  if (countryOfResidence === "") {
    setCountryOfResidenceError(true);
    isError = true;
  }

  if (businessSector === "") {
    setBusinessSectorError(true);
    isError = true;
  }

  if (legalForm === "") {
    setLegalFormError(true);
    isError = true;
  }

  if (occupation === "") {
    setOccupationError(true);
    isError = true;
  }

  if (personalEmail === "") {
    setPersonalEmailError(true);
    isError = true;
  }

  if (businessEmail === "") {
    setBusinessEmailError(true);
    isError = true;
  }

  if (privatePhone === "") {
    setPrivatePhoneError(true);
    isError = true;
  }

  if (businessPhone === "") {
    setBusinessPhoneError(true);
    isError = true;
  }

  if (landLinePhone === "") {
    setLandLinePhoneError(true);
    isError = true;
  }

  if (faxNumber === "") {
    setFaxNumberError(true);
    isError = true;
  }

  if (commercialRegister === "") {
    setCommercialRegisterError(true);
    isError = true;
  }

  if (supportingDocumentType === "") {
    setSupportingDocumentTypeError(true);
    isError = true;
  }

  if (supportingDocumentNumber === "") {
    setSupportingDocumentNumberError(true);
    isError = true;
  }

  if (supportingDocumentExpirationDate === "") {
    setSupportingDocumentExpirationDateError(true);
    isError = true;
  }

  if (maritalStatus === "") {
    setMaritalStatusError(true);
    isError = true;
  }

  return isError;
};

const formData: ThirdParty = {
  tiersType: tiersType as 'INSURANCE_COMPANY' | 'CUSTOMER_PP' | 'GUARANTOR' | 'CUSTOMER_PM' | 'USER',
  title: title,
  lastName: lastName,
  firstName: firstName,
  birthDate: birthDate,
  nationality: nationality,
  countryOfResidence: countryOfResidence,
  businessSector: businessSector,
  legalForm: legalForm,
  occupation: occupation,
  personalEmail: personalEmail,
  businessEmail: businessEmail,
  privatePhone: privatePhone,
  businessPhone: businessPhone,
  landLinePhone: landLinePhone,
  faxNumber: faxNumber,
  supportingDocumentType: supportingDocumentType as 'CIN' | 'RESIDENCE_CARD' | 'PASSPORT',
  supportingDocumentNumber: supportingDocumentNumber,
  supportingDocumentExpirationDate: supportingDocumentExpirationDate,
  maritalStatus: maritalStatus,
  commercialRegister : commercialRegister,
  companyName:companyName,
  user: {
    id: client.user.id,
  },
  //
  id: client.id,
  thirdPartyId: client.thirdPartyId
};
  const handleSave = async () => {
    if (checkEmptyInputs()) {
      setErrorMessage("Les champs obligatoires ne doivent pas être vides.");
      return null;
    }
    try {
      await updateClient(formData);
      setSuccessMessage("Modification succès!");
      setErrorMessage("");
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000);
      setIsNewFactOpen(false);
      resetFields(); // to reset fields values
    } catch (error) {
      console.log("Error saving thirdparty:", error);
      setSuccessMessage("");
      setErrorMessage("Erreur lors de la Modification du client.");
    }
  };

  const handleClose = () => {
    console.log("selected client : " , client)
    resetFields();
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    setIsNewFactOpen(false);
  
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const documentTypes = [
    'CIN' , 'RESIDENCE_CARD' , 'PASSPORT' ,
  ];

  const typeTiers = [
    "INSURANCE_COMPANY",
    "CUSTOMER_PP",
    "GUARANTOR",
    "CUSTOMER_PM",
    "USER",
  ];

  return (
    <React.Fragment>
       <Tooltip arrow title="Editer le client">
        <IconButton
          size="small"
          onClick={handleClickOpen}
        >
          <FileCopyIcon sx={{ color: "blue" }} fontSize="small" />
        </IconButton>
      </Tooltip>

     
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">
            Editer le client 
            { <span style={{ color: "blue" }}> #{client.thirdPartyId}</span> }
          </Typography>
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
          <Grid container spacing={3}>
            {/* <Grid item xs={6}>
    <TextField
      size="small"
      id="typeTiers"
      label="Type de tiers"
      fullWidth
      value={tiersType}
      onChange={(e) => {
        setTiersType(e.target.value);
        setTiersTypeError(e.target.value === "");
      }}
      error={tiersTypeError}
      helperText={tiersTypeError? "Type du client est requis" : ""}
    />
  </Grid> */}
            <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={typeTiers}
                value={tiersType}
                onChange={(event, value) => {
                  setTiersType(value ?? "");
                  setTiersTypeError(!value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    id="typeTiers"
                    label="Type de tiers"
                    fullWidth
                    
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTiersTypeError(true);
                      } else {
                        setTiersTypeError(false);
                      }
                    }}
                    error={tiersTypeError}
                    helperText={
                      tiersTypeError ? "Type du client est requis" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="titre"
                label="Titre"
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(e.target.value === "");
                }}
                error={titleError}
                helperText={titleError ? "Titre est requis" : ""}
              />
            </Grid>
       
            <Grid item xs={4}>
              <TextField
                size="small"
                id="nom"
                label="Nom"
                fullWidth
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError(e.target.value === "");
                }}
                error={lastNameError}
                helperText={lastNameError ? "Nom est requis" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="prenom"
                label="Prénom"
                fullWidth
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError(e.target.value === "");
                }}
                error={firstNameError}
                helperText={firstNameError ? "Prénom est requis" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="birthday"
                label="Date du naissance"
                fullWidth
                type="date"
                value={birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setBirthDateError(e.target.value === "");
                }}
                inputProps={{
                  max: new Date().toISOString().split("T")[0], // set min date to today
                }}
                error={birthDateError}
                helperText={birthDateError ? "Nom est requis" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="nationalite"
                label="Nationalité"
                fullWidth
                value={nationality}
                onChange={(e) => {
                  setNationality(e.target.value);
                  setNationalityError(e.target.value === "");
                }}
                error={nationalityError}
                helperText={nationalityError ? "Nationalité est requise" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="raisonSociale"
                label="Raison sociale"
                fullWidth
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setCompanyNameError(e.target.value === "");
                }}
                error={companyNameError}
                helperText={
                  companyNameError ? "Raison sociale est requise" : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="paysResidence"
                label="Pays de résidence"
                fullWidth
                value={countryOfResidence}
                onChange={(e) => {
                  setCountryOfResidence(e.target.value);
                  setCountryOfResidenceError(e.target.value === "");
                }}
                error={countryOfResidenceError}
                helperText={
                  countryOfResidenceError ? "Pays de résidence est requis" : ""
                }
              />
            </Grid>
      
            <Grid item xs={4}>
              <TextField
                size="small"
                id="secteurActivite"
                label="Secteur d'activité"
                fullWidth
                value={businessSector}
                onChange={(e) => {
                  setBusinessSector(e.target.value);
                  setBusinessSectorError(e.target.value === "");
                }}
                error={businessSectorError}
                helperText={
                  businessSectorError ? "Secteur d'activité est requis" : ""
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                id="formeJuridique"
                label="Forme juridique"
                fullWidth
                value={legalForm}
                onChange={(e) => {
                  setLegalForm(e.target.value);
                  setLegalFormError(e.target.value === "");
                }}
                error={legalFormError}
                helperText={legalFormError ? "Forme juridique est requise" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="profession"
                label="Profession"
                fullWidth
                value={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value);
                  setOccupationError(e.target.value === "");
                }}
                error={occupationError}
                helperText={occupationError ? "Profession est requise" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="emailPersonnel"
                label="Email personnel"
                fullWidth
                value={personalEmail}
                onChange={(e) => {
                  setPersonalEmail(e.target.value);
                  setPersonalEmailError(e.target.value === "");
                }}
                error={personalEmailError}
                helperText={
                  personalEmailError ? "Email personnel est requis" : ""
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                id="emailProfessionnel"
                label="Email professionnel"
                fullWidth
                value={businessEmail}
                onChange={(e) => {
                  setBusinessEmail(e.target.value);
                  setBusinessEmailError(e.target.value === "");
                }}
                error={businessEmailError}
                helperText={
                  businessEmailError ? "Email professionnel est requis" : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="telephonePersonnel"
                label="Téléphone personnel"
                fullWidth
                value={privatePhone}
                onChange={(e) => {
                  setPrivatePhone(e.target.value);
                  setPrivatePhoneError(e.target.value === "");
                }}
                error={privatePhoneError}
                helperText={
                  privatePhoneError ? "Téléphone personnel est requis" : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="telephoneProfessionnel"
                label="Téléphone professionnel"
                fullWidth
                value={businessPhone}
                onChange={(e) => {
                  setBusinessPhone(e.target.value);
                  setBusinessPhoneError(e.target.value === "");
                }}
                error={businessPhoneError}
                helperText={
                  businessPhoneError ? "Téléphone professionnel est requis" : ""
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                id="telephoneFixe"
                label="Téléphone fixe"
                fullWidth
                value={landLinePhone}
                onChange={(e) => {
                  setLandLinePhone(e.target.value);
                  setLandLinePhoneError(e.target.value === "");
                }}
                error={landLinePhoneError}
                helperText={
                  landLinePhoneError ? "Téléphone fixe est requis" : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="numeroFax"
                label="Numéro de fax"
                fullWidth
                value={faxNumber}
                onChange={(e) => {
                  setFaxNumber(e.target.value);
                  setFaxNumberError(e.target.value === "");
                }}
                error={faxNumberError}
                helperText={faxNumberError ? "Numéro de fax est requis" : ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="registreCommerce"
                label="Registre de commerce"
                fullWidth
                value={commercialRegister}
                onChange={(e) => {
                  setCommercialRegister(e.target.value);
                  setCommercialRegisterError(e.target.value === "");
                }}
                error={commercialRegisterError}
                helperText={
                  commercialRegisterError
                    ? "Registre de commerce est requis"
                    : ""
                }
              />
            </Grid>

            {/* <Grid item xs={4}>
              <TextField
                size="small"
                id="typePieceJustificative"
                label="Type de pièce justificative"
                fullWidth
                value={supportingDocumentType}
                onChange={(e) => {
                  setSupportingDocumentType(e.target.value);
                  setSupportingDocumentTypeError(e.target.value === "");
                }}
                error={supportingDocumentTypeError}
                helperText={
                  supportingDocumentTypeError
                    ? "Type de pièce justificative est requis"
                    : ""
                }
              />
            </Grid> */}
           {/* /////////////// */}

           <Grid item xs={4}>
              <Autocomplete
                size="small"
                disablePortal
                id="typePieceJustificative"
                value={supportingDocumentType}
                options={documentTypes}
                onChange={(event, value) => {
                  setSupportingDocumentType(value??"");
                  setSupportingDocumentTypeError(!value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    id="typePieceJustificative"
                    label="Type de pièce justificative"
                    fullWidth
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setSupportingDocumentTypeError(true);
                      } else {
                        setSupportingDocumentTypeError(false);
                      }
                    }}
                    error={supportingDocumentTypeError}
                    helperText={
                      supportingDocumentTypeError ? "Type de pièce justificative est requis" : ""
                    }
                  />
                )}
              />
            </Grid>




           {/* ffffffffffffffffffff */}
            <Grid item xs={4}>
              <TextField
                
                size="small"
                id="numeroPieceJustificative"
                label="Numéro de pièce justificative"
                fullWidth
                value={supportingDocumentNumber}
                onChange={(e) => {
                  setSupportingDocumentNumber(e.target.value);
                  setSupportingDocumentNumberError(e.target.value === "");
                }}
                error={supportingDocumentNumberError}
                helperText={
                  supportingDocumentNumberError
                    ? "Numéro de pièce justificative est requis"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="dateExpPieceJustificative"
                type="date"
                label="Date d'expiration du document justificatif"
                fullWidth
                value={supportingDocumentExpirationDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setSupportingDocumentExpirationDate(e.target.value);
                  setSupportingDocumentExpirationDateError(
                    e.target.value === ""
                  );
                }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // set min date to today
                }}
                error={supportingDocumentExpirationDateError}
                helperText={
                  supportingDocumentExpirationDateError
                    ? "date d'expiration du document justificatif est requis"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="etatCivil"
                label="État civil"
                fullWidth
                value={maritalStatus}
                onChange={(e) => {
                  setMaritalStatus(e.target.value);
                  setMaritalStatusError(e.target.value === "");
                }}
                error={maritalStatusError}
                helperText={maritalStatusError ? "État civil est requis" : ""}
              />
            </Grid>
          </Grid>

          {successMessage && (
            <Alert
              variant="filled"
              severity="success"
              sx={{ width: "500px", margin: "auto" }}
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "500px", margin: "auto" }}
            >
              {errorMessage}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleSave}>
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
