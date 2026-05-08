import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Task } from 'src/models/task';
import { getTasksByUserId, updateTask } from 'src/utils/api/task/tasksApiCall';
import { formatDate } from 'src/utils/formatDate/CurrentDateTime';
import { Button, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Column {
  id: 'TYPE' | 'CRÉÉPAR' | 'DATEDECRÉATION' | 'PLANIFIÉ' | 'OBJET'| 'CASEID' | 'ACTION';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'TYPE', label: 'TYPE', minWidth: 100 },
  { id: 'CRÉÉPAR', label: 'CRÉÉ PAR', minWidth: 100 },
  {
    id: 'DATEDECRÉATION',
    label: 'DATE DE CRÉATION',
    minWidth: 170,
  },
  {
    id: 'PLANIFIÉ',
    label: 'PLANIFIÉ',
    minWidth: 170,
  },
  {
    id: 'OBJET',
    label: 'OBJET',
    minWidth: 170,
  },
  {
    id: 'CASEID',
    label: 'CASEID',
    minWidth: 170,
  },
  {
    id: 'ACTION',
    label: 'ACTION',
    minWidth: 170,
  },
];


export default function TaskTableDash() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allTasks, setAllTasks] = React.useState<Task[]>([]); // Store the rows data in state
  const [reloadData, setReloadData] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllTasksByUserId =async ()=>{
    const data = await getTasksByUserId() ; 
    setAllTasks(data);
    setReloadData(false)
    console.log("❌❌❌ all tasks : ",allTasks);
}


async function  updateTaskClicked(row: Task) {
      row.isNew = false ;
      try {
     const data=    await  updateTask(row.id,row);
        setReloadData(true);
        console.log(row)
        console.log("🟢🟢🟢🟢🟢🟢")
        console.log(data)
      } catch (error) {
        console.log("errror updating task", error)
      }
   
 }


React.useEffect(()=>{
    getAllTasksByUserId();
},[reloadData])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
        
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                  
                        <TableCell align='left'>
                         {row.type}
                        </TableCell>
                        
                        
                        <TableCell  align='left'>
                         {row.owner.email}
                        </TableCell>
                        <TableCell  align='left'>
                          { formatDate(row.startDate)  }
                        </TableCell>
                        
                        <TableCell align='left'>
                          { formatDate(row.scheduledTo)  }
                        </TableCell>
                        
                        <TableCell  align='left'>
                         {row.taskObject}
                        </TableCell>
                        
                        <TableCell   align='left'>
                         {row.cas.caseId}
                        </TableCell>
                        
                        <TableCell  align='left'>
                           
                            <Tooltip arrow title="Cacher cette tâche">
                  <IconButton
                    color="primary"
                    onClick={() => {
                       updateTaskClicked(row)
                    }}
                  >
                      <VisibilityIcon/>
                  </IconButton>
                </Tooltip>
                        </TableCell>
              
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}