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
import { Divider, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

//
import EventIcon from "@mui/icons-material/Event"; // example icon for Rendez-vous
import CallIcon from "@mui/icons-material/Call"; // icon for Appel
import EmailIcon from "@mui/icons-material/Email"; // icon for Email
import AssignmentIcon from "@mui/icons-material/Assignment"; // example icon for Tache
import ProcessIcon from "@mui/icons-material/AccountTree";
import { Task } from "src/models/task";
import { createNewTask } from "src/utils/api/task/tasksApiCall";
import { CaseContext } from "src/contexts/CaseContext";
import NumberPicker from "../Case/caseTasks/newTask/NumberPicker";
import { UserContext } from "src/contexts/UserContext";
import { getAllUsers } from "src/utils/api/user/userApi";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


export default function NewTask({ setfetchTasks }) {
  const { selectedCase } = React.useContext(CaseContext);
  const caseId = selectedCase ? selectedCase?.id : 0;
  const { currentUser } = React.useContext(UserContext);

  //states
  const [newTask, setNewTask] = React.useState<Task>({
    type: "Tache",
    startDate: new Date(),
    enDate: new Date(),
    createdOn: new Date(),
    scheduledTo: new Date(),
    project: selectedCase?.caseId ?? "",
    taskObject: "",
    taskDescription: "",
    sendNotification: true,
    achievement: 20,
  });

  const handleAchievementChange = (value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      achievement: value,
    }));
  };

  // ----------------------------------------------------
  const formatDate = (date: Date): string => {
    console.log(typeof date);
    // Format date in ISO-8601 format
    return date.toISOString(); // This will return date in "yyyy-MM-ddTHH:mm:ss.sssZ" format
  };

  // Define a function to create a new task
  const createTask = async () => {
    const taskData = {
      type: newTask.type,
      startDate: formatDate(newTask.startDate),
      enDate: formatDate(newTask.enDate),
      createdOn: formatDate(newTask.createdOn),
      owner: {
        id: newTask.owner?.id,
      },
      createdBy: {
        id :currentUser.id,
      },
      taskObject: newTask.taskObject,
      scheduledTo: formatDate(newTask.scheduledTo),
      sendNotification: newTask.sendNotification,
      taskDescription: newTask.taskDescription,
      achievement: newTask.achievement,
    };

    // Call the createNewTask function with the new task data
    const createdTask = await createNewTask(caseId, taskData);

    if (createdTask) {
      console.log("New task created:", createdTask);
      // Handle success, e.g., update UI or state with the created task
      setfetchTasks(true);
      handleClose();
    } else {
      console.log("Failed to create task");
      // Handle error, e.g., show error message to the user
    }
  };

  // ----------------------------------------------------

  React.useEffect(() => {
    console.log(newTask);
  }, [newTask]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = React.useState("Tache");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setNewTask({ ...newTask, type: newAlignment });
      setAlignment(newAlignment);
    }
  };

  const projects = [
    { label: selectedCase?.caseId },
  ];


  // getAllUsers
  //WE NEED TO RETREAVE ALL THE OWNERS

  async function fetchAllUsers() {
    try {
      const allUsers = await getAllUsers();
      if (allUsers) {
        console.log("🚀 ~ fetchAllUsers ~ allUsers:", allUsers);
        return allUsers;
      }
      return null;
    } catch (error) {
      console.error("Error while fetching all users data:", error);
      return null;
    }
  }

  const getOwners = (userList) => {
    return userList.map((user) => ({ id: user.id, label: user.email,profile:user.profile }));
  };
  
    const [owners, setOwners] = React.useState([]);
    const [profiles, setProfiles] = React.useState([]);

    React.useEffect(() => {

      console.log("🚀 ~ NewTask ~ Owners:", owners)
      console.log("🚀 ~ NewTask ~ profiles:", profiles)
    },[owners,profiles]);
  
    React.useEffect(() => {
      const fetchAndSetOwners = async () => {
        const allUsers = await fetchAllUsers();
        if (allUsers) {
          setOwners(getOwners(allUsers));
        }
      };
      
      fetchAndSetOwners();
    }, []);

 

  return (
    <React.Fragment>
      <Tooltip arrow title="Nouvelle tâche">
        <IconButton onClick={handleClickOpen} size="large">
          <AddIcon sx={{ color: "green" }} fontSize="small" />
        </IconButton>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Nouvelle tâche hhh</Typography>
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
            <Grid item xs={12}>
              <Typography variant="h6">Type</Typography>
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="Rendez-vous">
                  <EventIcon fontSize="small" /> Rendez-vous
                </ToggleButton>
                <Divider flexItem orientation="vertical" />

                <ToggleButton value="Appel">
                  <CallIcon fontSize="small" /> Appel
                </ToggleButton>
                <Divider flexItem orientation="vertical" />

                <ToggleButton value="Email">
                  <EmailIcon fontSize="small" /> Email
                </ToggleButton>
                <Divider flexItem orientation="vertical" />

                <ToggleButton value="Tache">
                  <AssignmentIcon fontSize="small" /> Tache
                </ToggleButton>
                <Divider flexItem orientation="vertical" />

                <ToggleButton value="Processus">
                  <ProcessIcon fontSize="small" /> Processus
                </ToggleButton>
                <Divider flexItem orientation="vertical" />

                <ToggleButton value="Visite">
                  <LocationOnIcon fontSize="small" /> Visite
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="start-date"
                label="Début"
                type="datetime-local"
                // defaultValue="2017-05-24T10:30"
                value={newTask.startDate.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    startDate: new Date(e.target.value),
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="end-date"
                label="Fin"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                value={newTask.enDate.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setNewTask({ ...newTask, enDate: new Date(e.target.value) })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            {/* Repeat similar Grid items for other fields */}
            <Grid item xs={6}>
              <TextField
                size="small"
                id="creation-date"
                label="Date de création"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                value={newTask.createdOn.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    createdOn: new Date(e.target.value),
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="due-date"
                label="Date d'échéance"
                type="datetime-local"
                value={newTask.scheduledTo.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    scheduledTo: new Date(e.target.value),
                  })
                }
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
                value={
                  projects.find(
                    (project) => project.label === newTask.project
                  ) || null
                }
                defaultValue={selectedCase?.caseId}
                onChange={(event, newValue) => {
                  setNewTask({
                    ...newTask,
                    project: newValue ? newValue.label : "",
                  });
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Projet (IDENTIFIANT CASE)" id="project" />
                )}
              />
            </Grid>
            {/* --------------------------------- */}
            <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={owners}
                onChange={(event, newValue) => {
                  setNewTask({
                    ...newTask,
                    owner: newValue ? newValue : null,
                    profile: newValue ? newValue?.profile?.profile : "",
                  });
                  setProfiles([{ label: newValue ? newValue?.profile?.profile : "" }]);
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proprietaire"
                    id="Proprietaire"
                  />
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
                value={
                  // profiles.find(
                  //   (profile) => profile.label === newTask.profile
                  // ) || null
                  {label:newTask?.profile}
                }
                onChange={(event, newValue) => {
                  setNewTask({
                    ...newTask,
                    profile: newValue ? newValue.label : "",
                  });
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Profile" id="profile" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                id="Objet"
                label="Objet"
                defaultValue=""
                value={newTask.taskObject}
                onChange={(event) => {
                  setNewTask({
                    ...newTask,
                    taskObject: event.target.value,
                  });
                }}
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
                value={newTask.taskDescription}
                onChange={(event) => {
                  setNewTask({
                    ...newTask,
                    taskDescription: event.target.value,
                  });
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <NumberPicker
                value={newTask.achievement}
                onChange={handleAchievementChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        {/* ------------------------------------ */}
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => {
              createTask();
            }}
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
