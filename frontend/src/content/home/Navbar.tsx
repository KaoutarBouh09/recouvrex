import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  alpha,
  lighten,
  Divider,
  styled,
  useTheme,
  Typography,
  Button,
  ListItem,
} from "@mui/material";

import React, { useEffect } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import DrawerItem from "./DrawerItem";
// import { UserContext } from "src/contexts/UserContext";
import { useKeycloak } from "@react-keycloak/web";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 1;
        background-color: ${alpha(theme.header.background ?? "#FFF", 0.95)};
        backdrop-filter: blur(3px);
         position: fixed;
        justify-content: space-between;
        width: 100%;
`
);

const ListMenu = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function Navbar() {
  const theme = useTheme();

  // const { handleLogin } = useContext(UserContext);
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  console.log("🚀 ~ Navbar ~ keycloak:", keycloak);
  console.log(
    "🚀 ~ handleLogInOut ~ (keycloak.authenticated:",
    keycloak.authenticated
  );

  useEffect(() => {
    console.log("use effect check if already logedin");
    if (keycloak.authenticated) {
      navigate("/Cases");
    }
  }, [keycloak.authenticated, navigate]);

  const itemList = [
    {
      text: "Home",
      to: "/",
    },
    {
      text: "About",
      to: "/about",
    },
    {
      text: "Contact",
      to: "/contact",
    },
  ];

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`,
      }}
    >
      <Box  sx={{ display: "flex",alignItems:'center' ,cursor:'pointer' }}>
       <Link to={'/'}>
        <Box sx={{ display: { xs: "block", sm: "block" } }}>
          <img src="/recouvrex.svg" height={65} alt="logo" />
        </Box>
        </Link>
        <Typography variant={"h1"} gutterBottom>
          Recouvrex
        </Typography>
        <Divider orientation="vertical" sx={{ color: "black", ml: 2, mr: 1 }} />
      </Box>

      {/* <Box display="flex" alignItems="center"></Box> */}

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            justifyContent: "end",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <ListMenu>
            {itemList.map((item) => {
              const { text } = item;
              return (
                <ListItem key={text}>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    sx={{
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#1e2a5a",
                        fontSize: "64px",
                      },
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ListMenu>
        </Box>
        <Box>
          <Button
            onClick={() => {
              keycloak.login();
            }}
            // component={RouterLink}
            // to="/cases"
            size="medium"
            variant="contained"
          >
            {keycloak.authenticated ? "DASHBOARD" : "LOGIN"}
          </Button>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <DrawerItem />
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Navbar;
