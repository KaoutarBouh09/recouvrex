import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, TextField, Typography } from '@mui/material';
import { getDueDatesByCaseId } from 'src/utils/api/dueDate/DueDateApi';
import { CaseContext } from 'src/contexts/CaseContext';
import { formatDate } from 'src/utils/formatDate/CurrentDateTime';
import { DueDate } from 'src/models/DueDate';
import InvoicePayementDateTable from './InvoiceTablePartiel';
import { height } from '@mui/system';

const columns: GridColDef[] = [
  { field: 'IDFacture', headerName: 'ID Facture', width: 300  },
  { field: 'montantTotal', headerName: 'Montant total', width: 300,  },
  { field: 'DateEcheance', headerName: 'Date d\'écheance', width: 300,  },
  { field: 'StatusFacture', headerName: 'Status Facture', width: 250, },  
];
    


export default function InvoiceTableIntegral({setRows,rows}) {
    const { selectedCase } = React.useContext(CaseContext);
    
  
    const getDueDatesImpayee = async () => {
      const idCase = selectedCase?.id ?? 0;
      const dueDates = await getDueDatesByCaseId(idCase);
      const newRows = dueDates
        .filter(duedate => duedate.dueDateStatus !== 'PAYEE')
        .map(duedate => ({
          id: duedate.id,
          IDFacture: duedate.dueDateId,
          StatusFacture: duedate.dueDateStatus,
          montantTotal: duedate.principalAmount,
          DateEcheance: formatDate(duedate.startDate) , // Assuming this property exists

          DatePaiement: '', // Initialiser la date de paiement comme une chaîne vide

          
        }));
      setRows(newRows);
    };
  
    React.useEffect(() => {
      getDueDatesImpayee();
    }, []);
  

 

    return (
      <Grid style={{ height: `300px`, width: '100%' }}>
        <DataGrid
           rows={rows} 
           columns={columns} 
           checkboxSelection 
           rowSelectionModel= {rows.map((row:DueDate) =>row.id)}
           localeText={{ noRowsLabel: 'Pas du factures dans cette case de status IMPAYEE .' }}
              
           />
   
      </Grid>
    );


  }
  



