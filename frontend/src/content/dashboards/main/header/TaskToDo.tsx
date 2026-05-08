import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { Task } from 'src/models/task';
import { useEffect, useState } from 'react';
import { getTasksByCaseId } from 'src/utils/api/task/tasksApiCall';
import TaskTableDash from './TaskTableDash';

interface Data {
  id: number;
  type: string;
  createdBy: string;
  createdDate: string;
  scheduledTo: string;
  object: string;
  description: string;
  owner: string;
  achievement: number;
}

export default function TaskToDo() {
  const [fetchTasks, setfetchTasks] = useState(false);

  const [rows, setRows] = useState<Data[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // Store the rows data in state

  const getTasks = async()=>{
    const result = await getTasksByCaseId(212);
    setAllTasks(result);
  }
  useEffect(() => {
      getTasks()
  }, []);


  return (
    <Paper
      sx={{
        p: 1,
        margin: 'auto',
        maxWidth: "95%",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        border:"2px solid green"
      }}
      
    >
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Typography gutterBottom variant="h4" bgcolor={'green'} color='white' p={1}>
                Nouveaux Tâches 

              </Typography>
        </Grid>
        <Grid item xs={12}>
         <TaskTableDash />
        </Grid>
     
      </Grid>
    </Paper>
  );
}