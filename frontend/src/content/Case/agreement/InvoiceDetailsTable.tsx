import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, TextField, Typography } from "@mui/material";
import {
  getDueDatesByCaseId,
  updateExpectedPaymentDate,
} from "src/utils/api/dueDate/DueDateApi";
import { CaseContext } from "src/contexts/CaseContext";
import { formatDate } from "src/utils/formatDate/CurrentDateTime";
import { DueDate } from "src/models/DueDate";

import { height } from "@mui/system";
import { Agreement } from "src/models/Agreement";


export default function InvoiceDetailsTable({
    agreement 
}:{agreement:Agreement}) {
  const { selectedCase } = React.useContext(CaseContext);
  const [rows, setRows] = React.useState([]);
  console.log("duedates from agreement ==> : ",agreement.dueDates)
  const columns: GridColDef[] = [
    { field: "dueDateId", headerName: "ID Facture", width: 250 },
    { field: "principalAmount", headerName: "Montant total", width: 250 },
    { field: "paymentDueDate", headerName: "Date d'écheance", width: 200 },
    { field: "dueDateStatus", headerName: "Status Facture", width: 250 },
    { field: "expectedPaymentDate", headerName: "Date paiment prévu", width: 250 },

 
  ];




  /////////////


  ////////////

  return (
    
    <Grid style={{ height: `300px`, width: "100%" }}>
        
      <DataGrid
        rows={agreement.dueDates}
        columns={columns}
        checkboxSelection={false}
        autoHeight={false}
        rowHeight={70} // Set the custom height for the rows
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5,10,15]}
        localeText={{
          noRowsLabel:"Pas de factures dans cette case de statut IMPAYEE."

        }}
      />
    </Grid>
  );
}
