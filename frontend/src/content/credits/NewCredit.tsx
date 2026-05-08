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
import { Alert, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { createNewCredit } from "src/utils/api/credit/CreditApi"; // Assuming you have an API function for creating a new credit entity
import { getAllClientsByUserId } from "src/utils/api/client/ClientApi";
import { ThirdParty } from "src/models/ThirdParty";
import { Credit } from "src/models/Credit";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import NewInvoice from "../Case/caseNonPaidInvoices/NewInvoice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NewCredit({ setIsNewFactOpen , clientData }) {
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State variables for credit entity
  const [creditId, setCreditId] = useState("");
 // const [clientId,setClientId] = useState(clientData.id);
  const [contractId, setContractId] = useState("");
  const [creditType, setCreditType] = useState("Personal Loan");
const [nominalAmount, setNominalAmount] = useState(50000.00);
const [cumulativeDisbursement, setCumulativeDisbursement] = useState(60000.00);
const [setupDate, setSetupDate] = useState("2024-04-01");
const [firstInstallmentDate, setFirstInstallmentDate] = useState("2024-05-01");
const [nominalRate, setNominalRate] = useState(5.5);
const [rateNature, setRateNature] = useState("Fixed");
const [installmentCount, setInstallmentCount] = useState(12);
const [deferredType, setDeferredType] = useState("Deferred");
const [restructured, setRestructured] = useState(false);
const [restructuringCount, setRestructuringCount] = useState(0);
const [creditStatus, setCreditStatus] = useState("Active");
const [constantInstallmentAmount, setConstantInstallmentAmount] = useState(1500.00);
const [unpaidAmount, setUnpaidAmount] = useState(5000.00);
const [insuranceAmount, setInsuranceAmount] = useState(50.00);
const [triggeredInstallmentNumber, setTriggeredInstallmentNumber] = useState(1);
const [openingDate, setOpeningDate] = useState("2024-04-01");
const [modificationDate, setModificationDate] = useState("2024-05-02");
const [lastStatusDate, setLastStatusDate] = useState("2024-05-01");
const [cumulativeRedemptionAmount, setCumulativeRedemptionAmount] = useState(0.00);
const [lastRedemptionDate, setLastRedemptionDate] = useState(null);

  // Add other state variables for credit entity here

  // Handle save function
  // Construct the credit entity object
  const formData:Credit = {
    creditId: creditId,
    contract: {
      id: 1, // we should modify this to be nonstatic 
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
    id: 0,
    agency: "",
    manager: "",
    thirdParty:{
       id:clientData.id,
       thirdPartyId:"",
    }

  }
  const handleSave = async () => {
    

    try {
      await createNewCredit(formData); // Call the API function to create a new credit entity
      setSuccessMessage("Le nouveau crédit a été créé avec succès!");
      setErrorMessage("");
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000);
      resetFields(); // Reset fields
      setIsNewFactOpen(false);
    } catch (error) {
      console.log("Error saving credit:", error);
      setSuccessMessage("");
      setErrorMessage("Erreur lors de la création du crédit.");
    }
  };

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

  // Handle close function
  const handleClose = () => {
    resetFields();
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Handle click open function
  const handleClickOpen = () => {
    setOpen(true);
  };
  //////////////////////////////////
  /////////////////////////////////
  const [thirdParties, setThirdParties] = useState([]);
  
    const fetchAllClientsByUserId = async()=>{
           
      try {
           const results = await getAllClientsByUserId();
           console.log("ALL THIRDPARTY FROM INDEX : " , results);
           setThirdParties(results);
      } catch (error) {
          console.log(error);
      }


    }

    React.useEffect(()=>{
        fetchAllClientsByUserId();
    },[])
//////////////////////////////////////
//////////////////////////////////////








  ///////////////////////////////
  //////////////////////////////
 const YESNO = ["OUI" , "NON"]
  return (
    <React.Fragment>
      <Tooltip arrow title="Créer Nouveau Crédit">
        <Button
          size="small"
          rel="noopener noreferrer"
          sx={{ mb: 1 }}
          variant="contained"
          startIcon={<AddIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Ajouter
        </Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Créer nouveau crédit</Typography>
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
            {/* <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={thirdParties}
                getOptionLabel={(option:ThirdParty) => option.thirdPartyId + ' : ' +option.firstName + ' ' + option.lastName} // Specify how to display options
                
                onChange={(event, value) => {
                    if(value) setClientId(value.id);
                //   setTiersTypeError(!value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    id="idClient"
                    label="ID client associé"
                    fullWidth
                    onChange={(e) => {
                    //   if (e.target.value === "") {
                    //     setTiersTypeError(true);
                    //   } else {
                    //     setTiersTypeError(false);
                    //   }
                    }}
                    // error={tiersTypeError}
                    // helperText={
                    //   tiersTypeError ? "Type du client est requis" : ""
                    // }
                  />
                )}
              />
            </Grid> */}
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
                onChange={(e) =>setNominalRate(parseFloat(e.target.value))}
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
                //value={restructured?"OUI":"NON"}
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
              sx={{ width: "450px" , position:"absolute",left:"1%"}}
            >
              {errorMessage}
            </Alert>
          )}
          <Button autoFocus variant="contained" onClick={handleSave}>
            Enregistrer
          </Button>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
