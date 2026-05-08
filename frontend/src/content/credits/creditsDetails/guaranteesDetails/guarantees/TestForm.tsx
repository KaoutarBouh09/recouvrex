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
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


export default function TestForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const projects = [{ label: "COLO00000057" }, /* Define project options here */];
  const profiles = [{ label: "profile 1" }, /* Define profile options here */];

  return (
    <React.Fragment>
      <Button
      onClick={handleClickOpen}
        size="small"
        rel="noopener noreferrer"
        sx={{ mb: 1 }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
      >
        Ajouter
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Nouvelle tâche</Typography>
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
        {/* -------------------------------------- */}
        <DialogContent dividers>
          <Grid container spacing={1.5}> 
            {/* Repeat similar Grid items for other fields */}
            <Grid item xs={6}>
              <TextField
                size="small"
                id="creation-date"
                label="Date de création"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                // value={newTask.createdOn.toISOString().slice(0, 16)}
                // onChange={(e) =>
                //   setNewTask({
                //     ...newTask,
                //     createdOn: new Date(e.target.value),
                //   })
                // }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
           
            <Grid item xs={12}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={projects}
                // value={
                //   projects.find(
                //     (project) => project.label === newTask.project
                //   ) || null
                // }
                // onChange={(event, newValue) => {
                //   setNewTask({
                //     ...newTask,
                //     project: newValue ? newValue.label : "",
                //   });
                // }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Projet" id="project" />
                )}
              />
            </Grid>
         
            <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={profiles}
                // sx={{ width: 300 }}
                // value={
                //   profiles.find(
                //     (profile) => profile.label === newTask.profile
                //   ) || null
                // }
                // onChange={(event, newValue) => {
                //   setNewTask({
                //     ...newTask,
                //     profile: newValue ? newValue.label : "",
                //   });
                // }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="profile" id="profile" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                id="Objet"
                label="Objet"
                defaultValue=""
                // value={newTask.taskObject}
                // onChange={(event) => {
                //   setNewTask({
                //     ...newTask,
                //     taskObject: event.target.value,
                //   });
                // }}
                fullWidth
              />
            </Grid>
            {/* ...other fields... */}
            <Grid item xs={12}>
              <TextField
                size="small"
                id="taskDescription"
                label="Description"
                multiline
                rows={3}
                // value={}
                onChange={() => { }}
                fullWidth
              />
            </Grid>

            <Grid item fontSize={10} xs={12}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Envoyer notification"
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* -------------------------------------- */}

        <DialogActions>
       
          <Button
            autoFocus
            variant="contained"
            // onClick={() => {
            //   createTask();
            // }}
          >
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
