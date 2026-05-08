import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Card,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useParams } from "react-router-dom";
import GarantiesSearch from "./GarantiesSearch";
import BusinessFundGuaranteeTable from "./guaranteeTables/BusinessFundGuaranteeTable";
import MortgageGuaranteeTable from "./guaranteeTables/MortgageGuaranteeTable";
import VehicleGuaranteeTable from "./guaranteeTables/VehicleGuaranteeTable";
import PersonalGuaranteeTable from "./guaranteeTables/PersonalGuaranteeTable";
import RealEstateGuaranteeTable from "./guaranteeTables/RealEstateGuaranteeTables";
import Footer from "src/components/Footer";
import SelectForm from "./SelectForm";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { useEffect } from "react";

function Guarantees() {
  const { guarantees,setCreditId } = useGuaranteeContext();
  const { creditId = "" } = useParams();


  useEffect(() => {
    setCreditId(creditId);
  }, [creditId, setCreditId]);

  return (
    <>
      <Helmet>
        <title>Garanties du crédit n°{creditId}</title>
      </Helmet>
      <Card >
        <Container maxWidth="xl"  sx={{ mt: 2 }}>
          <Grid
          sx={{minHeight:"80vh"}}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={6}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h2" sx={{ mt: 1, ml: 1 }}>
                Garanties du crédit n°{creditId}
              </Typography>
              <GarantiesSearch />
            </Grid>
            <Grid item sm={6}>
              <Stack
                sx={{
                  alignItems: "end",
                  justifyContent: "space-between",
                  mr: 2,
                }}
              >
                <SelectForm />
                <Tooltip arrow title="Rafraîchir">
                  <IconButton size="small" sx={{ ml: 0.2 }}>
                    <AutorenewIcon fontSize="small" sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item xs={12}>
            <Divider/>
            </Grid>

        { 
       ( guarantees?.businessFundGuarantees.length==0 ) && 
       ( guarantees?.mortgageGuarantees.length==0)  && 
       ( guarantees?.personalGuarantees.length==0 ) && 
      (  guarantees?.realEstateGuarantees.length==0 ) && 
      (  guarantees?.vehicleGuarantees.length==0 ) && 
          <Grid item xs={12}>
              <Stack sx={{display:'flex' ,justifyContent:'center',alignItems:'center'}}>
              <img src="/img/noguaranties.png" width={100} alt="icon" />
              <Typography variant="h4" sx={{ m: 1,color:'black',fontSize:22,fontWeight:20}}>
              Aucune garantie n'est disponible pour le crédit n°{creditId}
              </Typography>
              </Stack>
            </Grid>}
            <Grid item xs={12}>
              {/* <Typography variant="h3" sx={{ m: 1 }}>
                Tableau des Garanties Fonds de commerce
              </Typography> */}
              <BusinessFundGuaranteeTable />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography variant="h3" sx={{ m: 1 }}>
                Tableau des Garanties Hypothèque
              </Typography> */}
              <MortgageGuaranteeTable />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography variant="h3" sx={{ m: 1 }}>
                Tableau des Garanties Caution Personnelle
              </Typography> */}
              <PersonalGuaranteeTable />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography variant="h3" sx={{ m: 1 }}>
                Tableau des Garanties Bien immobilier
              </Typography> */}
              <RealEstateGuaranteeTable />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography variant="h3" sx={{ m: 1 }}>
                Tableau des Garanties Véhiculaires
              </Typography> */}
              <VehicleGuaranteeTable />
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}></Grid>
          </Grid>
          <Footer />
        </Container>
      </Card>
    </>
  );
}

export default Guarantees;
