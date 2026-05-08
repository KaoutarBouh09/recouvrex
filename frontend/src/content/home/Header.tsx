import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "77vh",
    backgroundImage: "url(./header-background.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: "blue",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

 
  return (
    <CustomBox component="header">
      <Grid container>
      <Grid item xs={12} md={8}   sx={{color:"white",p:5}}>
          <Typography variant="h1" sx={{fontSize:'90px'}}>
          Recouvrez vos créances aisément
          </Typography>
          <Typography variant="body1"  sx={{fontSize:'22px'}}>
          Bienvenue sur notre application de recouvrement des créances clients. Simplifiez la gestion et le suivi des dettes de vos clients grâce à nos fonctionnalités avancées. Suivez les paiements, communiquez efficacement et optimisez votre processus de recouvrement pour une gestion plus fluide et efficace de vos créances.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <img src="/recouvrex.svg" alt="logo" />
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Header;
