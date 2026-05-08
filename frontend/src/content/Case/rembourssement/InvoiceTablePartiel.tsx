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
import InvoicePayementDateTable from "./InvoiceTablePartiel";
import { height } from "@mui/system";
import { UpdatedPaymentDate } from "./InterfacePaymentDate";

export default function InvoiceTablePartiel({
  setUpdatedPaymentDates,
  updatedPaymentDates,
}) {
  const { selectedCase } = React.useContext(CaseContext);
  const [rows, setRows] = React.useState([]);

  const columns: GridColDef[] = [
    { field: "IDFacture", headerName: "ID Facture", width: 250 },
    { field: "montantTotal", headerName: "Montant total", width: 250 },
    { field: "DateEcheance", headerName: "Date d'écheance", width: 250 },
    { field: "StatusFacture", headerName: "Status Facture", width: 200 },

    // Nouvelle colonne pour la date de paiement
    {
      field: "DatePaiement",
      headerName: "Date de paiement",
      width: 200,

      renderCell: (params) => (
        <TextField
          type="date"
          sx={{
            textAlign: "center",
            verticalAlign: "middle",
          }}
          //  value={params.row.DatePaiement}
          onChange={(e) => {
            handleDatePaiementChange(params.row.id, e.target.value);
            console.log("etargetvalue 🟠:", e.target.ariaValueNow);
          }}
        />
      ),
    },
  ];
  const getDueDatesImpayee = async () => {
    const idCase = selectedCase?.id ?? 0;
    const dueDates = await getDueDatesByCaseId(idCase);
    const newRows = dueDates
      .filter((duedate) => duedate.dueDateStatus !== "PAYEE")
      .map((duedate) => ({
        id: duedate.id,
        IDFacture: duedate.dueDateId,
        StatusFacture: duedate.dueDateStatus,
        montantTotal: duedate.principalAmount,
        DateEcheance: formatDate(duedate.startDate), // Assuming this property exists

        DatePaiement: "", // Initialiser la date de paiement comme une chaîne vide
      }));
    setRows(newRows);
  };

  React.useEffect(() => {
    getDueDatesImpayee();
  }, []);

  /////////////

  function handleDatePaiementChange(id: any, value: any): void {
    let updatedDates = [...updatedPaymentDates];
    let itemExists = false;
    console.log("value : ", value);
    // Check if the item already exists
    updatedDates.forEach((item: UpdatedPaymentDate, index) => {
      if (item.id === id) {
        itemExists = true;
        if (value === "") {
          updatedDates.splice(index, 1);
        } else {
          item.date = value; // Update the existing item's date
        }
      }
    });

    // If the item doesn't exist, insert a new item
    if (!itemExists) {
      updatedDates.push({ id: id, date: value });
    }

    // Update the state with the modified array
    setUpdatedPaymentDates(updatedDates);
    console.log("array dates 🔷: ", updatedDates);
  }

  ////////////

  return (
    <Grid style={{ height: `300px`, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        autoHeight={false}
        rowHeight={70} // Set the custom height for the rows
        localeText={{
          noRowsLabel:"Pas de factures dans cette case de statut IMPAYEE."

        }}
      />
    </Grid>
  );
}
