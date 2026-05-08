import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Link } from "@mui/material";
import { getAgreements, updateAgreement } from "src/utils/api/agreement/AgreementApi";
import { AgreementStatusTypesEnum } from "src/models/enums/agreementEnums/AgreementStatusTypesEnum";
import { Agreement } from "src/models/Agreement";





const AgreementsHistory = () => {

    const [agreements, setAgreements] = React.useState<Agreement[]>([]);

    const fetchAgreements= async(managerId:number)=>{
      try {
         const response =  await getAgreements(managerId,null,null);
         setAgreements(response?.data);
         
      } catch (error) {
          console.log(error);
      }           
  }
 
  React.useEffect(()=>{
         fetchAgreements(1) // user connected if its Admin
  },[])

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Aagreement ID</TableCell>
            <TableCell align="left">Client</TableCell>
            <TableCell align="left">Agent</TableCell>
            <TableCell align="left">Type d'agreement</TableCell>
            <TableCell align="left">Date d'agreement</TableCell>
            <TableCell align="left">Date paiement prévu</TableCell>
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
                <Link href={`/case`} rel="noopener noreferrer">
                  {row.agreementId}
                </Link>
              </TableCell>
              <TableCell align="left">{row.agreementDescription}</TableCell>
              <TableCell align="left">
                <Link
                  href={`/contrat/${row.initiator.identificationNumber}`}
                  rel="noopener noreferrer"
                >
                  {row.initiator.identificationNumber}
                </Link>
              </TableCell>
              <TableCell align="left">
                <Link href={`/case`} rel="noopener noreferrer">
                  {row.agreementType}
                </Link>
              </TableCell>
              <TableCell align="left">{row.agreementStartDate}</TableCell>
              <TableCell align="left">{row.agreementDate}</TableCell>
              
              {/* <TableCell
                align="left"
              >
                <Button variant="contained" color="success" style={{marginInlineEnd:"10px"}} onClick={()=>{updateAgreementStatus(row,"ACCEPTE")}}>
                  Accepter
                </Button>
                <Button variant="contained" color="error" onClick={()=>{updateAgreementStatus(row,"REJETE")}}>
                  Rejéter
                </Button>
              </TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Container>
  );
}
export default AgreementsHistory;