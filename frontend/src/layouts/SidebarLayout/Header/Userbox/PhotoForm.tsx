import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Avatar,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Box } from "@mui/system";
import { uploadUserPhoto } from "src/utils/api/user/userApi";
import { UserContext } from "src/contexts/UserContext";
import { SnackbarOptions } from "src/components/CustomizedSnackbars/SnackbarOptions";
// import { User } from "src/models/User";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const defaultImage =
  "https://res.cloudinary.com/dm9udoven/image/upload/v1716625891/recouvrex_photos/defaultPhoto_ftvpzr.jpg";



  
interface PhotoFormProps {
  handleShowSnackbar: (options:SnackbarOptions)=>void;
}

export default function PhotoForm({handleShowSnackbar}:PhotoFormProps) {
  const { currentUser ,setCurrentUser } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string>(currentUser.photo??defaultImage);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const response = await uploadUserPhoto(selectedImage);  // Use the new function
      console.log(response);

      if (response) {
        setCurrentUser({
          ...currentUser,
          photo: response.url // Assuming the response contains the URL of the uploaded image
        });
      }

      setSelectedImage(null);
      handleClose();

      //show success message
      handleShowSnackbar({
        message: "Votre photo de profil a été mise à jour avec succès.",
        severity: "success",
      })
      
     
      // Handle success response
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error response

      handleShowSnackbar({
        message: "Erreur lors de la mise à jour de la photo de profil. Veuillez réessayer!",
        severity: "error",
      })

    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClickOpen}>
        <AccountBoxTwoToneIcon fontSize="small" />
        <ListItemText primary="Mon Profil" />
      </ListItem>
      <BootstrapDialog
        PaperProps={{ sx: { maxWidth: "none", minWidth: 900 } }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3" gutterBottom>
            Photo de profil
          </Typography>
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
        <DialogContent
          dividers
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 400, height: 400 }}
            alt={"photo"}
            src={previewImage}
          />
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <Tooltip arrow title="supprimer">
                <IconButton
                  size="large"
                  color="error"
                  sx={{ border: "1px ", display: "block" }}
                >
                  <DeleteIcon fontSize="large" />
                  <Typography variant="h4" gutterBottom>
                    Supprimer
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="télécharger">
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <IconButton
                    size="large"
                    sx={{ border: "1px ", display: "block" }}
                    color="primary"
                    component="span"
                  >
                    <DriveFolderUploadIcon fontSize="large" />
                    <Typography variant="h4" gutterBottom>
                      Télécharger
                    </Typography>
                  </IconButton>
                </label>
              </Tooltip>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
             { selectedImage && !isLoading &&  <Tooltip arrow title="sauvegarder">
                <IconButton
                  onClick={handleSave}
                  size="large"
                  sx={{ border: "1px ", display: "block" }}
                  color="primary"
                >
                  <SaveIcon fontSize="large" />
                  <Typography variant="h4" gutterBottom>
                    Sauvegarder
                  </Typography>
                </IconButton>
              </Tooltip>}
              {isLoading &&
                  <Stack sx={{ display:'block' ,textAlign:'center'}} spacing={2} direction="row">
                  <CircularProgress color="primary"  />
                  <Typography color="primary"  variant="h4" gutterBottom>
                  chargement ...
                  </Typography>
                </Stack>
              }
            </Box>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}