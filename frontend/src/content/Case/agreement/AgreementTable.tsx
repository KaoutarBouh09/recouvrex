import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { getAgreements, updateAgreement } from "src/utils/api/agreement/AgreementApi";
import { AgreementStatusTypesEnum } from "src/models/enums/agreementEnums/AgreementStatusTypesEnum";
import { Agreement } from "src/models/Agreement";
import {Link} from 'react-router-dom'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import BlockIcon from '@mui/icons-material/Block';
import { Block } from "@mui/icons-material";
import AgreementDetails from "./AgreementDetails";

const AgreementsTable = ({agreements,setAgreements,setRefrechAgreements}) => {

const [ isAccepted,setIsAccepted] = React.useState(false);
const [ isRefused,setIsRefused] = React.useState(false);

    // const  updateAgreementStatus = async (row: Agreement, newStatus: string)=> {
    //      try {
    //          row.agreementStatus=newStatus;
    //        const response =  await updateAgreement(row);
    //           if(newStatus=="ACCEPTE"){
    //               setIsAccepted(true)
    //           }else{
    //             setIsRefused(true);
    //           }
    //      } catch (error) {
    //         console.log(error)
    //      }
    // }

  return (
    <TableContainer component={Paper}>
   
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Aagreement ID</TableCell>
      
            <TableCell align="left">Type d'agreement</TableCell>
            <TableCell align="left">Date d'agreement</TableCell>
            <TableCell align="left">Status</TableCell>
            {/* <TableCell align="left">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          { agreements.map((row:Agreement) => (
            <TableRow
              key={row.agreementId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {/* <Link to={`/case`} rel="noopener noreferrer" >
                  {row.agreementId}
                </Link> */}
                <AgreementDetails row={row} setRefrechAgreements={setRefrechAgreements}/>
              </TableCell>
         
              <TableCell align="left">
                <Link to={`/case`} rel="noopener noreferrer">
                  {row.agreementType}
                </Link>
              </TableCell>
              <TableCell align="left">{row.agreementStartDate}</TableCell>
              {/* <TableCell align="left">{row.agreementDate}</TableCell> */}
              
              <TableCell
                align="left"
              >
                {row.agreementStatus=="ACCEPTE"?
                <>
                 <IconButton>
                 <Typography variant="h5" color="green" marginRight={1}>
                    Accepeté
                </Typography>
                      <OfflinePinIcon color="success"/>
               </IconButton>
                </>
                :row.agreementStatus=="REJETE"?
                <>
              
                
               <IconButton>
               <Typography variant="h5" color="red" marginRight={1}>
                Rejeté
                </Typography>
                    <BlockIcon color="error"/>
             </IconButton>
              </>
                :row.agreementStatus=="EN_COURS"?
                
                <>
              
                
               <IconButton>
               <Typography variant="h5" color="secondary" marginRight={1}>
                En cours
                </Typography>
                    {/* <BlockIcon color="secondary"/> */}
             </IconButton>
              </>
                :
                <>
                {/* <Button variant="contained" color="success" style={{marginInlineEnd:"10px"}} onClick={()=>{updateAgreementStatus(row,"ACCEPTE")}}>
                  Accepter
                </Button>
                <Button variant="contained" color="error" onClick={()=>{updateAgreementStatus(row,"REJETE")}}>
                  Rejéter
                </Button> */}
                </>
                }
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
   
      </Table>
      {/* <Grid textAlign={"center"} marginBlock={2}>
          <Link to={`/agreement/agreementHistory`}>
                <Button color="secondary" variant="outlined">
                  voir l'historique Agreements
                </Button>
              </Link>
          </Grid> */}
    </TableContainer>
  );
}
export default AgreementsTable;