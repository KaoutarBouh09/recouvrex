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
import { Divider, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import EventIcon from "@mui/icons-material/Event"; // example icon for Rendez-vous
import CallIcon from "@mui/icons-material/Call"; // icon for Appel
import EmailIcon from "@mui/icons-material/Email"; // icon for Email
import AssignmentIcon from "@mui/icons-material/Assignment"; // example icon for Tache
import ProcessIcon from "@mui/icons-material/AccountTree";
import { Task } from "src/models/task";
import { updateTask } from "src/utils/api/task/tasksApiCall";
import NumberPicker from "../Case/caseTasks/newTask/NumberPicker";
import { CaseContext } from "src/contexts/CaseContext";
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

interface UpdateTaskProps {
  setfetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task;
}

export default function UpdateTask({
  setfetchTasks,
  selectedTask,
}: UpdateTaskProps) {
  const { selectedCase } = React.useContext(CaseContext);

  // States
  const [taskToUpdate, setTaskToUpdate] = React.useState<Task>({
    id: selectedTask?.id,
    type: selectedTask?.type || "", // Provide default value if selectedTask is undefined
    startDate: selectedTask?.startDate || "",
    enDate: selectedTask?.enDate || "",
    createdOn: selectedTask?.createdOn || "",
    scheduledTo: selectedTask?.scheduledTo || "",
    project: selectedCase?.caseId ?? "",
    taskObject: selectedTask?.taskObject || "", // Renamed to match the Task model
    taskDescription: selectedTask?.taskDescription || "", // Renamed to match the Task model
    sendNotification: true,
    achievement: selectedTask?.achievement || 20, // Provide default value if selectedTask is undefined

  });

  React.useEffect(() => {
  console.log("🚀 ~ taskToUpdate:", taskToUpdate)
  
  }, [taskToUpdate,setTaskToUpdate])
  

  
  const handleAchievementChange = (value) => {
    setTaskToUpdate((prevTask) => ({
      ...prevTask,
      achievement: value,
    }));
  };

  React.useEffect(() => {
    // Update taskToUpdate when selectedTask changes
    if (selectedTask) {
      setTaskToUpdate(selectedTask);
      setAlignment(selectedTask.type);
    }
  }, [selectedTask]);

  const updateTaskById = async () => {
    // Call the updateTask function with the new task data
    const createdTask = await updateTask(taskToUpdate.id, taskToUpdate);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = React.useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTaskToUpdate({ ...taskToUpdate, type: newAlignment });
      setAlignment(newAlignment);
    }
  };


  const projects = [{ label: selectedCase?.caseId }];

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
    return userList.map((user) => ({
      id: user.id,
      label: user.email,
      profile: user.profile,
    }));
  };

  const [owners, setOwners] = React.useState([]);
  const [profiles, setProfiles] = React.useState([]);


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
      <Tooltip title="Edit tâche">
        <IconButton onClick={handleClickOpen}>
          <BorderColorSharpIcon sx={{ color: "green" }} />
        </IconButton>
      </Tooltip>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3">Edit tâche</Typography>
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
                value={taskToUpdate.startDate}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
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
                value={taskToUpdate.enDate}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    enDate: new Date(e.target.value),
                  })
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
                value={taskToUpdate.createdOn}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
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
                value={taskToUpdate.scheduledTo}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
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
                    (project) => project.label === taskToUpdate.project
                  ) || null
                }
                defaultValue={selectedCase?.caseId}
                onChange={(event, newValue) => {
                  setTaskToUpdate({
                    ...taskToUpdate,
                    project: newValue ? newValue.label : "",
                  });
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Projet (IDENTIFIANT CASE)"
                    id="project"
                  />
                )}
              />
            </Grid>
            {/* --------------------Owner------------- */}
            <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={owners}
                defaultValue={ { label: taskToUpdate?.owner?.email }}
                onChange={(event, newValue) => {
                  setTaskToUpdate({
                    ...taskToUpdate,
                    owner: newValue ? newValue : null,
                    profile: newValue ? newValue?.profile?.profile : "",
                  });
                  setProfiles([
                    { label: newValue ? newValue?.profile?.profile : "" },
                  ]);
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
            {/* -------------------profile------------------- */}
            <Grid item xs={6}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={profiles}
                value={
                  { label: taskToUpdate?.profile || taskToUpdate?.owner?.profile?.profile }
                }
                onChange={(event, newValue) => {
                  setTaskToUpdate({
                    ...taskToUpdate,
                    profile: newValue ? newValue.label : "",
                  });
                }}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Profile" id="profile" />
                )}
              />
            </Grid>

            {/* --------------------------------------------- */}

            <Grid item xs={12}>
              <TextField
                size="small"
                id="Objet"
                label="Objet"
                defaultValue=""
                value={taskToUpdate.taskObject}
                onChange={(event) => {
                  setTaskToUpdate({
                    ...taskToUpdate,
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
                value={taskToUpdate.taskDescription}
                onChange={(event) => {
                  setTaskToUpdate({
                    ...taskToUpdate,
                    taskDescription: event.target.value,
                  });
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <NumberPicker
                value={taskToUpdate.achievement}
                onChange={handleAchievementChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* -------------------------------------- */}

        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => {
              updateTaskById();
            }}
          >
            Sauvegarder les modifications
          </Button>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
