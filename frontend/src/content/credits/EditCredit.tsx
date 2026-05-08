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
import { getAllClientsByUserId, updateClient } from "src/utils/api/client/ClientApi";
import { ThirdParty } from "src/models/ThirdParty";
import { Credit } from "src/models/Credit";
import { updateCredit } from "src/utils/api/credit/CreditApi";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
})); 

interface EditCreditProps {
  setIsNewFactOpen: any;
  credit:Credit
}
export default function EditCredit({ setIsNewFactOpen,credit}: EditCreditProps) {

  const themeTable = useTheme();
  const [open, setOpen] = React.useState(false);
     ////////////////////////
 //TextField states
 const [creditId, setCreditId] = useState("");
 const [clientId,setClientId] = useState(0);
 const [contractId, setContractId] = useState("");
 const [creditType, setCreditType] = useState("");
 const [nominalAmount, setNominalAmount] = useState(0);
 const [cumulativeDisbursement, setCumulativeDisbursement] = useState(0);
 const [setupDate, setSetupDate] = useState("");
 const [firstInstallmentDate, setFirstInstallmentDate] = useState("");
 const [nominalRate, setNominalRate] = useState(0);
 const [rateNature, setRateNature] = useState("");
 const [installmentCount, setInstallmentCount] = useState(0);
 const [deferredType, setDeferredType] = useState("");
 const [restructured, setRestructured] = useState(false);
 const [restructuringCount, setRestructuringCount] = useState(0);
 const [creditStatus, setCreditStatus] = useState("");
 const [constantInstallmentAmount, setConstantInstallmentAmount] = useState(0);
 const [unpaidAmount, setUnpaidAmount] = useState(0);
 const [insuranceAmount, setInsuranceAmount] = useState(0);
 const [triggeredInstallmentNumber, setTriggeredInstallmentNumber] = useState(0);
 const [openingDate, setOpeningDate] = useState("");
 const [modificationDate, setModificationDate] = useState("");
 const [lastStatusDate, setLastStatusDate] = useState("");
 const [cumulativeRedemptionAmount, setCumulativeRedemptionAmount] = useState(0);
 const [lastRedemptionDate, setLastRedemptionDate] = useState("");
 const [thirdParties , setThirdParties]=useState([])
  //TextField ERRORS
 

     /////////////////////////

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset fields function
  const resetFields = () => {
    setCreditId("");
    setContractId("");
    setCreditType("");
    setNominalAmount(0);
    setCumulativeDisbursement(0);
    setSetupDate("");
    setFirstInstallmentDate("");
    setNominalRate(0);
    setRateNature("");
    setInstallmentCount(0);
    setDeferredType("");
    setRestructured(false);
    setRestructuringCount(0);
    setCreditStatus("");
    setConstantInstallmentAmount(0);
    setUnpaidAmount(0);
    setInsuranceAmount(0);
    setTriggeredInstallmentNumber(0);
    setOpeningDate("");
    setModificationDate("");
    setLastStatusDate("");
    setCumulativeRedemptionAmount(0);
    setLastRedemptionDate("");
    // Reset other fields here
  };
  
  const initializeStateFromObject = (credit:Credit) => {  
    setCreditId(credit.creditId);
    setContractId(credit.contract.contractId);
    setCreditType(credit.creditType);
    setNominalAmount(credit.nominalAmount);
    setCumulativeDisbursement(credit.cumulativeDisbursement);
    setSetupDate(credit.setupDate);
    setFirstInstallmentDate(credit.firstInstallmentDate);
    setNominalRate(credit.nominalRate);
    setRateNature(credit.rateNature);
    setInstallmentCount(credit.installmentCount);
    setDeferredType(credit.deferredType);
    setRestructured(credit.restructured);
    setRestructuringCount(credit.restructuringCount);
    setCreditStatus(credit.creditStatus);
    setConstantInstallmentAmount(credit.constantInstallmentAmount);
    setUnpaidAmount(credit.unpaidAmount);
    setInsuranceAmount(credit.insuranceAmount);
    setTriggeredInstallmentNumber(credit.triggeredInstallmentNumber);
    setOpeningDate(credit.openingDate);
    setModificationDate(credit.modificationDate);
    setLastStatusDate(credit.setupDate);
    setCumulativeRedemptionAmount(credit.cumulativeRedemptionAmount);
    setLastRedemptionDate(credit.lastRedemptionDate);
     setClientId(credit.thirdParty.id);
  };
  
  
 
  useEffect(() => {
    if (credit) {
      initializeStateFromObject(credit);
    }
  }, [open]);
  
// const checkEmptyInputs = () => {
//   let isError = false;

//   // Check each input and set its error state if empty
//   if (tiersType === "") {
//     setTiersTypeError(true);
//     isError = true;
//   }

//   if (title === "") {
//     setTitleError(true);
//     isError = true;
//   }

//   if (lastName === "") {
//     setLastNameError(true);
//     isError = true;
//   }

//   if (firstName === "") {
//     setFirstNameError(true);
//     isError = true;
//   }

//   if (companyName === "") {
//     setCompanyNameError(true);
//     isError = true;
//   }

//   if (birthDate === "") {
//     setBirthDateError(true);
//     isError = true;
//   }

//   if (nationality === "") {
//     setNationalityError(true);
//     isError = true;
//   }

//   if (countryOfResidence === "") {
//     setCountryOfResidenceError(true);
//     isError = true;
//   }

//   if (businessSector === "") {
//     setBusinessSectorError(true);
//     isError = true;
//   }

//   if (legalForm === "") {
//     setLegalFormError(true);
//     isError = true;
//   }

//   if (occupation === "") {
//     setOccupationError(true);
//     isError = true;
//   }

//   if (personalEmail === "") {
//     setPersonalEmailError(true);
//     isError = true;
//   }

//   if (businessEmail === "") {
//     setBusinessEmailError(true);
//     isError = true;
//   }

//   if (privatePhone === "") {
//     setPrivatePhoneError(true);
//     isError = true;
//   }

//   if (businessPhone === "") {
//     setBusinessPhoneError(true);
//     isError = true;
//   }

//   if (landLinePhone === "") {
//     setLandLinePhoneError(true);
//     isError = true;
//   }

//   if (faxNumber === "") {
//     setFaxNumberError(true);
//     isError = true;
//   }

//   if (commercialRegister === "") {
//     setCommercialRegisterError(true);
//     isError = true;
//   }

//   if (supportingDocumentType === "") {
//     setSupportingDocumentTypeError(true);
//     isError = true;
//   }

//   if (supportingDocumentNumber === "") {
//     setSupportingDocumentNumberError(true);
//     isError = true;
//   }

//   if (supportingDocumentExpirationDate === "") {
//     setSupportingDocumentExpirationDateError(true);
//     isError = true;
//   }

//   if (maritalStatus === "") {
//     setMaritalStatusError(true);
//     isError = true;
//   }

//   return isError;
// };

const formData: Credit = {
    id: credit.id,
    creditId: creditId,
    contract: {
      id: 1,
      contractId: contractId
    },
    creditType: creditType,
    nominalAmount: nominalAmount,
    cumulativeDisbursement: cumulativeDisbursement,
    setupDate: setupDate,
    firstInstallmentDate: firstInstallmentDate,
    nominalRate: nominalRate,
    rateNature: rateNature,
    installmentCount: installmentCount,
    deferredType: deferredType,
    restructured: restructured,
    restructuringCount: restructuringCount,
    creditStatus: creditStatus,
    constantInstallmentAmount: constantInstallmentAmount,
    unpaidAmount: unpaidAmount,
    insuranceAmount: insuranceAmount,
    triggeredInstallmentNumber: triggeredInstallmentNumber,
    openingDate: openingDate,
    modificationDate: modificationDate,
    lastStatusDate: lastStatusDate,
    cumulativeRedemptionAmount: cumulativeRedemptionAmount,
    lastRedemptionDate: lastRedemptionDate,
 
    agency: "",
    manager: "",
    thirdParty:{
       id:clientId,
       thirdPartyId:"",
    }

  }
  const handleSave = async () => {
    // if (checkEmptyInputs()) {
    //   setErrorMessage("Les champs obligatoires ne doivent pas être vides.");
    //   return null;
    // }
    try {
      await updateCredit(formData);
      setSuccessMessage("Modification succès!");
      setErrorMessage("");
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000);
      resetFields(); // to reset fields values
      setIsNewFactOpen(false);
    } catch (error) {
      console.log("Error updating credit:", error);
      setSuccessMessage("");
      setErrorMessage("Erreur lors de la Modification du crédit.");
    }
  };

  const handleClose = () => {
   // console.log("selected client : " , client)
    resetFields();
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    setIsNewFactOpen(false);
  
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchAllClientsByUserId = async()=>{
           
    try {
         const results = await getAllClientsByUserId();
         console.log("ALL THIRDPARTY FROM INDEX : " , results);
         setThirdParties(results);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    fetchAllClientsByUserId()
  },[])

  const YESNO = ["OUI" , "NON"]
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
            Editer le crédit 
            { <span style={{ color: "blue" }}> #{}</span> }
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
        
            <Grid item xs={6}>
              <TextField
                size="small"
                id="contractId"
                label="ID Contrat"
                fullWidth
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
  <Autocomplete
    size="small"
    disablePortal
    id="combo-box-demo"
    options={thirdParties}
    getOptionLabel={(option: ThirdParty) => option.thirdPartyId + ' : ' + option.firstName + ' ' + option.lastName}
    value={thirdParties.find((option:ThirdParty) => option.thirdPartyId === credit.thirdParty.thirdPartyId) || null}
    onChange={(event, value) => {
      if (value) setClientId(value.id);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        id="idClient"
        label="ID client associé"
        fullWidth
      />
    )}
  />
</Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                id="creditType"
                label="Type Crédit"
                fullWidth
                value={creditType}
                onChange={(e) => setCreditType(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                size="small"
                id="nominalAmount"
                label="Montant nominal"
                fullWidth
                value={nominalAmount}
                onChange={(e) => setNominalAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="cumulativeDisbursement"
                label="Déblocage cumulatif"
                fullWidth
                value={cumulativeDisbursement}
                onChange={(e) => setCumulativeDisbursement(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="setupDate"
                label="Date de mise en place"
                fullWidth
                type="date"
                value={setupDate}
                onChange={(e) => setSetupDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="firstInstallmentDate"
                label="Date de la première échéance"
                fullWidth
                type="date"
                value={firstInstallmentDate}
                onChange={(e) => setFirstInstallmentDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="nominalRate"
                label="Taux nominal"
                fullWidth
                value={nominalRate}
                onChange={(e) => setNominalRate(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="rateNature"
                label="Nature du taux"
                fullWidth
                value={rateNature}
                onChange={(e) => setRateNature(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="installmentCount"
                label="Nombre d'échéances"
                fullWidth
                value={installmentCount}
                onChange={(e) => setInstallmentCount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="deferredType"
                label="Type de différé"
                fullWidth
                value={deferredType}
                onChange={(e) => setDeferredType(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
            <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={YESNO}  
                value={credit.restructured?"OUI":"NON"}        
                onChange={(event, value) => {
                   value=="OUI"?setRestructured(true):setRestructured(false)
                    
                //   setTiersTypeError(!value);
                }}
                renderInput={(params) => (
              <TextField
                  {...params}
                size="small"
                id="restructured"
                label="Restructuré (oui/non)"
                fullWidth
              
                // onChange={(e) => setRestructured(e.target.value)}
              
              /> 
                )}/>

            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="restructuringCount"
                label="Nombre de restructurations"
                fullWidth
                value={restructuringCount}
                onChange={(e) => setRestructuringCount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="creditStatus"
                label="Statut du crédit"
                fullWidth
                value={creditStatus}
                onChange={(e) => setCreditStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="constantInstallmentAmount"
                label="Montant de l'échéance constante"
                fullWidth
                value={constantInstallmentAmount}
                onChange={(e) => setConstantInstallmentAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="unpaidAmount"
                label="Montant impayé"
                fullWidth
                value={unpaidAmount}
                onChange={(e) => setUnpaidAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="insuranceAmount"
                label="Montant de l'assurance"
                fullWidth
                value={insuranceAmount}
                onChange={(e) => setInsuranceAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="triggeredInstallmentNumber"
                label="Numéro d'échéance déclenchée"
                fullWidth
                value={triggeredInstallmentNumber}
                onChange={(e) => setTriggeredInstallmentNumber(parseFloat(e.target.value))}
              />
            </Grid>
           
         
            <Grid item xs={6}>
              <TextField
                size="small"
                id="lastStatusDate"
                label="Date du dernier statut"
                fullWidth
                type="date"
                value={lastStatusDate}
                onChange={(e) => setLastStatusDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              type="number"
                size="small"
                id="cumulativeRedemptionAmount"
                label="Montant cumulé des rachats"
                fullWidth
                value={cumulativeRedemptionAmount}
                onChange={(e) => setCumulativeRedemptionAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="lastRedemptionDate"
                label="Date du dernier rachat"
                fullWidth
                type="date"
                value={lastRedemptionDate}
                onChange={(e) => setLastRedemptionDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* Add other fields here */}
          </Grid>
        
        </DialogContent>
        <DialogActions>
        {successMessage && (
            <Alert
              variant="filled"
              severity="success"
              sx={{ width: "500px", position:"absolute",left:"1%" }}
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "500px", position:"absolute",left:"1%"
               }}
            >
              {errorMessage}
            </Alert>
          )}
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
