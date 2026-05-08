import { useContext, useEffect, useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";

import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
// import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import { UserContext } from "src/contexts/UserContext";
import { useKeycloak } from "@react-keycloak/web";
import PhotoForm from "./PhotoForm";
import CustomizedSnackbars from "src/components/CustomizedSnackbars";
import { SnackbarOptions } from "src/components/CustomizedSnackbars/SnackbarOptions";
// import { useNavigate } from "react-router-dom";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { keycloak } = useKeycloak();
  const { currentUser: userData } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log("\n\n\nuserData")
  // console.log(userData)

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
   if(keycloak && !keycloak.authenticated){
     navigate("/");
   }
  }, [keycloak,navigate])

  // useEffect(() => {
  //  if(keycloak && !keycloak.authenticated){
  //    navigate("/");
  //  }
  // }, [userData])

  const defaultImage =
    "https://res.cloudinary.com/dm9udoven/image/upload/v1716625891/recouvrex_photos/defaultPhoto_ftvpzr.jpg";

  // states for alert -------------------------
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>(
    {
      message: "",
      severity: "success",
    }
  );

  const handleShowSnackbar = (options: SnackbarOptions) => {
    handleClose();
    setSnackbarOptions(options);
    setSnackbarOpen(true);
  };
  // -------------------------------------------

  return (
    <>
     
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={"user photo"}
          src={userData.photo ?? defaultImage}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {userData.email ? userData.email : "user not connected"}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {userData?.profile?.profile ?? "JOB TITLE"}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={"user photo"}
            src={userData.photo ?? defaultImage}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {userData.lastName + " " + userData.firstName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {userData?.profile?.profile ?? "JOB TITLE"}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          {/* <ListItem button >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Mon Profil" />
          </ListItem> */}
          <PhotoForm  handleShowSnackbar={handleShowSnackbar}/>
          {/* <ListItem button to="/dashboards/messenger" component={NavLink}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem> */}
          {/* <ListItem
            button
            to="/management/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem> */}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            fullWidth
            onClick={() => {
              keycloak.logout();
            }}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Se déconnecter
          </Button>
        </Box>
      </Popover>
      <CustomizedSnackbars
        setOpen={setSnackbarOpen}
        open={snackbarOpen}
        options={snackbarOptions}
      />
    </>
  );
}

export default HeaderUserbox;