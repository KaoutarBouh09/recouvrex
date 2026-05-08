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
import { DueDate } from "src/models/DueDate";
import Alert from "@mui/material/Alert";
import { CaseContext } from "src/contexts/CaseContext";
import { useCredit } from "src/contexts/CreditContext";
import { useClient } from "src/contexts/ClientContext";
import { sendEmailToClient } from "src/utils/api/client/ClientApi";

import { set } from "date-fns";
import { Agreement } from "src/models/Agreement";
import { AgreementStatusTypesEnum } from "src/models/enums/agreementEnums/AgreementStatusTypesEnum";
import { AgreementTypesEnum } from "src/models/enums/agreementEnums/AgreementTypesEnum";
import { createNewAgreement, updateAgreement } from "src/utils/api/agreement/AgreementApi";
import InvoiceTableIntegral from "../rembourssement/InvoiceTableIntegral";
import InvoiceTablePartiel from "../rembourssement/InvoiceTablePartiel";
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import BlockIcon from '@mui/icons-material/Block';
import InvoiceDetailsTable from "./InvoiceDetailsTable";
import { getAuthUser } from "src/auth/authUser";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AgreementDetails({row,setRefrechAgreements}) {

  //use context
  const { selectedCase } = React.useContext(CaseContext);
  const caseId = selectedCase ? selectedCase.caseId : "";
  const id = selectedCase ? selectedCase.id : 0;

  const [open, setOpen] = React.useState(false);
  ////////////////////
  const [remboursementType, setRemboursementType] = React.useState("");

  
  const [rows, setRows] = React.useState([]);
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
  };

  const handleClickOpen = () => {
    setOpen(true);
   
  };

  const remboursementTypes = [
    "Remboursement integral",
    "Remboursement Echelonné",
  ];
///////////////

      
  
//////////////
  

useEffect(()=>{
  setSuccessMessage("");
  setErrorMessage("");
},[])




    const  updateAgreementStatus = async (row: Agreement, newStatus: string)=> {
         try {
             row.agreementStatus=newStatus;
           const response =  await updateAgreement(row);
             console.log("updatedAgreement : ",response.data)
             setSuccessMessage("Mis à jours avec succès");
             setErrorMessage("");
             setRefrechAgreements(true)
             setTimeout(()=>{
               handleClose();
             },2000)
         } catch (error) {
          setSuccessMessage("");
          setErrorMessage("Erreur durant la mis à jours");
            console.log(error)
         }
    }


  return (
    <React.Fragment>
      <Tooltip arrow title={""}>
        <Button
          size="small"
          onClick={handleClickOpen}
        >
          {row.agreementId}
        </Button>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Agreement  #{row.agreementId}</Typography>
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
          <Grid item xs={12}>
            <Typography variant="h4">Type: <span style={{color:"blue"}}>{row.agreementType} </span></Typography>

            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined" // Add variant for a larger input field
                size="medium" // Increase size from small to medium
                id="montant case"
                label="montant du case"
                value={row.case1.principalAmount}
                fullWidth
                disabled
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
                disabled
                value={row.agreementStartDate}
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

         
        
              {/* <Grid item xs={6} margin={"auto"}>
                <TextField
                  type="date"
                  variant="outlined" // Add variant for a larger input field
                  size="medium" // Increase size from small to medium
                  id="datesaisie"
                  label="date de paiement prévue"
                  fullWidth
                  value={row.}
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
              </Grid> */}
          
              <></>
         
            {/* //////////////////////// */}
            <Grid item xs={12}>

              <InvoiceDetailsTable agreement={row} />
         
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
            
                
                  
                 {/* <IconButton>
                 <Typography variant="h5" color="green" marginRight={1}>
                    Accepeté
                </Typography>
                      <OfflinePinIcon color="success"/>
               </IconButton>
             
                
               <IconButton>
               <Typography variant="h5" color="red" marginRight={1}>
                Rejeté
                </Typography>
                    <BlockIcon color="error"/>
             </IconButton> */}
             
         {getAuthUser()?.profile?.id==2 && <>
          <Button variant="contained" color="success" style={{marginInlineEnd:"10px"}} onClick={()=>{updateAgreementStatus(row,"ACCEPTE")}}>
                  Accepter
                </Button>
                <Button variant="contained" color="error" onClick={()=>{updateAgreementStatus(row,"REJETE")}}>
                  Rejéter
                </Button>
         </>}
              
         
             
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
