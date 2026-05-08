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
import { DialogContentText, Radio, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import {
  formatDateWithDifferentFormat,
  getCurrentDate,
  getCurrentDateTime,
} from "../../../utils/formatDate/CurrentDateTime";
import { useState, useEffect } from "react";
import { createNewDueDate, updateExpectedPaymentDate } from "src/utils/api/dueDate/DueDateApi";
import { getFilteredCasesByCaseId } from "src/utils/api/case/caseApiCall";
import { Case } from "../../../models/case";
import { DueDate, DueDateInterface } from "src/models/DueDate";
import Alert from "@mui/material/Alert";
import { CaseContext } from "src/contexts/CaseContext";
import { useCredit } from "src/contexts/CreditContext";
import { useClient } from "src/contexts/ClientContext";
import { sendEmailToClient } from "src/utils/api/client/ClientApi";
import InvoiceTableIntegral from "./InvoiceTableIntegral";
import InvoiceTablePartiel from "./InvoiceTablePartiel";
import { UpdatedPaymentDate } from "./InterfacePaymentDate";
import { set } from "date-fns";
import { time } from "console";
import { Agreement } from "src/models/Agreement";
import { AgreementStatusTypesEnum } from "src/models/enums/agreementEnums/AgreementStatusTypesEnum";
import { AgreementTypesEnum } from "src/models/enums/agreementEnums/AgreementTypesEnum";
import { createNewAgreement } from "src/utils/api/agreement/AgreementApi";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function RembourseDialog({setIsDueDateStatusChange,setRefrechAgreements}) {

  //use context
  const { selectedCase } = React.useContext(CaseContext);
  const caseId = selectedCase ? selectedCase.caseId : "";
  const id = selectedCase ? selectedCase.id : 0;

  const [open, setOpen] = React.useState(false);
  ////////////////////
  const [remboursementType, setRemboursementType] = React.useState("");
  const [isRemboursementIntegral, setIsRemboursementIntegral] =React.useState(true);

  const [updatedPaymentDates, setUpdatedPaymentDates] = React.useState<UpdatedPaymentDate[]>([]);
  const [rows, setRows] = React.useState([]);
  //////
  const [agreementDueDates, setAgreementDueDates] = React.useState([]); // i add this to stock duedates for each agreement
  ////////////////////
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  ///////////////////
  const [paymentDateIntegral, setPaymentDateIntegral] = useState("");
  ////////////
  const handleClose = () => {
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    setPaymentDateIntegral("");
    setUpdatedPaymentDates([])
    
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsRemboursementIntegral(true);
  };

  const remboursementTypes = [
    "Remboursement integral",
    "Remboursement Echelonné",
  ];
///////////////
  let agreement:Agreement = {
    id:0,
    agreementId: "",
    agreementDate: paymentDateIntegral,
    agreementStatus: AgreementStatusTypesEnum.EN_COURS,
    agreementType: isRemboursementIntegral ? AgreementTypesEnum.REGLEMENT_INTEGRALE : AgreementTypesEnum.REGLEMENT_ECHELONNE,
    agreementStartDate: getCurrentDateTime(),
    agreementValidityDate: undefined,
    initiator: selectedCase?.assignedAgent,
    validator: selectedCase?.assignedAgent.manager,
    agreementDescription: "",
    case1: selectedCase,
    dueDates: rows
  }
        const createAgreement= async(agreement:Agreement)=>{
          try {
            await createNewAgreement(agreement)
            setRefrechAgreements(true);
          } catch (error) { 
             console.log("error creating agreement ❌ ",error)
          }
             

        }
  
//////////////
  
const updateDueDate = async ()=>{
  setIsDueDateStatusChange(true);
  if(isRemboursementIntegral) {
    if(paymentDateIntegral!=""){
         setAgreementDueDates(rows)
      try {
        rows.forEach(async (item:any)=>{
           await updateExpectedPaymentDate(item.id ,paymentDateIntegral );
           setPaymentDateIntegral("");
           setErrorMessage("");
           setSuccessMessage("les dates prévu du paiment sont mis a jours sans erreurs")
           console.log('update paydate success')
        }) 
        console.log("🟡🟡🟡")
     console.log("siasi:",agreement.agreementDate)
     console.log("jour:",agreement.agreementStartDate)
     console.log(agreement.agreementValidityDate)
        console.log("🟡🟡🟡")
        await createAgreement(agreement);
     } catch (error) {
        console.log('update paydate faild',error)
        setSuccessMessage("");
        setErrorMessage("erreur du mis a jours date prevu du paiment")
     }
     setTimeout(() => {
      setOpen(false);
      setSuccessMessage("");
      setErrorMessage("");
    }, 2000);
    }
    else{
      setSuccessMessage("");
      setErrorMessage("Le champs date paiment prévu est vide !")
    }
    
  }
  else{
    if(updatedPaymentDates.length==0){
      setSuccessMessage("");
      setErrorMessage("Tous les champs sont vides !")
    }else{
  console.log("array Paydates 🚨: ",updatedPaymentDates);
  try {
      
   updatedPaymentDates.forEach(async (item:UpdatedPaymentDate)=>{
    ////// added to manage agreement_duedates table
    //  rows.forEach((row:DueDateInterface)=>{
    //        if(row.id===item.id){
    //            row.expectedPaymentDate = item.date
    //        }
    //  })

    /////
       console.log("pappapa : 😆",updatedPaymentDates)
      await updateExpectedPaymentDate(item.id , item.date);
    
    console.log("updated succefly");
    setErrorMessage("");
    setSuccessMessage("les dates prévu du paiment sont mis a jours sans erreurs")
 
   })
   await createAgreement(agreement);

  } catch (error) {
    setSuccessMessage("");
    setErrorMessage("erreur du mis a jours date prevu du paiment")
    console.log("error update payment date : ",error)
  }


  setUpdatedPaymentDates([])

  setTimeout(() => {
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  }, 2000);
  
}



  }


}

useEffect(()=>{
  setSuccessMessage("");
  setErrorMessage("");
},[isRemboursementIntegral])



  return (
    <React.Fragment>
      <Tooltip arrow title={`Remboursser case #${caseId}`}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#b300b3",
            "&:hover": {
              backgroundColor: "#b300cc",
            },
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Rembourser
        </Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Remboursser case #{caseId}</Typography>
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
                variant="outlined" // Add variant for a larger input field
                size="medium" // Increase size from small to medium
                id="montant case"
                label="montant du case"
                value={selectedCase?.principalAmount}
                fullWidth
                InputProps={{
                  // Customize input text style
                  style: {
                    fontSize: 18, // Increase font size
                    fontWeight: 500, // Make text bold
                    color: "#000000", // Darken text color
                  },
                }}
                InputLabelProps={{
                  // Customize input text style
                  style: {
                    fontSize: 18, // Increase font size
                    fontWeight: 500, // Make text bold
                    color: "#1D2F6F", // Darken text color
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined" // Add variant for a larger input field
                size="medium" // Increase size from small to medium
                id="datesaisie"
                label="date du saisie"
                value={getCurrentDate()}
                fullWidth
                InputProps={{
                  // Customize input text style
                  style: {
                    fontSize: 18, // Increase font size
                    fontWeight: 500, // Make text bold
                    color: "#000000", // Darken text color
                  },
                }}
                InputLabelProps={{
                  // Customize input text style
                  style: {
                    fontSize: 18, // Increase font size
                    fontWeight: 500, // Make text bold
                    color: "#1D2F6F", // Darken text color
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={remboursementTypes}
                defaultValue={"Remboursement integral"}
                onChange={(event, value) => {
                  setRemboursementType(value ?? "");
                  setIsRemboursementIntegral(
                    value === "Remboursement integral" ? true : false
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    id="typeTiers"
                    label="Type du remboursement"
                    fullWidth
                    disabled
                  />
                )}
              />
            </Grid>
            {isRemboursementIntegral ? (
              <Grid item xs={6} margin={"auto"}>
                <TextField
                  type="date"
                  variant="outlined" // Add variant for a larger input field
                  size="medium" // Increase size from small to medium
                  id="datesaisie"
                  label="date de paiement prévue"
                  fullWidth
                  InputProps={{
                    // Customize input text style
                    style: {
                      fontSize: 18, // Increase font size
                      fontWeight: 500, // Make text bold
                      color: "#000000", // Darken text color
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    // Customize input text style
                    style: {
                      fontSize: 18, // Increase font size
                      fontWeight: 500, // Make text bold
                      color: "#1D2F6F", // Darken text color
                    },
                  }}
                 
                   onChange={(e)=>{setPaymentDateIntegral(e.target.value)}}
                />
              </Grid>
            ) : (
              <></>
            )}
            {/* //////////////////////// */}
            <Grid item xs={12}>
              {isRemboursementIntegral? <InvoiceTableIntegral setRows={setRows} rows = {rows} /> : 
              <InvoiceTablePartiel setUpdatedPaymentDates={setUpdatedPaymentDates}  updatedPaymentDates={updatedPaymentDates} />}
         
            </Grid>

       

            {/* //////////////////////////// */}

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Envoyer notification"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
        {successMessage && (
            <Alert
              variant="filled"
              severity="success"
              sx={{ width: "500px" , position:"absolute",left:"1%"}}
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "500px"  , position:"absolute",left:"1%"}}
            >
              {errorMessage}
            </Alert>
          )}
          <Button autoFocus variant="contained" onClick={updateDueDate}>
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
