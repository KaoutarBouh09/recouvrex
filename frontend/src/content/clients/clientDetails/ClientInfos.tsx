import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  Autocomplete,
  TextField,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThirdParty } from "src/models/ThirdParty";
import { useClient } from "src/contexts/ClientContext";

const ClientInfos = () => {
  
  const { clientData, setClientData } = useClient();

  const client: ThirdParty = clientData;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h3">
          Client <span style={{ color: "blue" }}> #{client.thirdPartyId}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card>
          <Box sx={{ p: 1 }}>
            <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Type du client
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.tiersType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Titre
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.title}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nom & Prénom
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.lastName} {client.firstName}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nom de la société
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.companyName}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date de naissance
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.birthDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nationalité
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.nationality}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Pays de résidence
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.countryOfResidence}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Secteur d'activité
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.businessSector}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Forme légale
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.legalForm}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Occupation
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.occupation}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Email personnel
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.personalEmail}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Email professionnel
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.businessEmail}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Téléphone privé
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.privatePhone}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Téléphone professionnel
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.businessPhone}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Téléphone fixe
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.landLinePhone}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Numéro de fax
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.faxNumber}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Registre de commerce
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.commercialRegister}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Type de document d'identification
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.supportingDocumentType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Numéro de document d'identification
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.supportingDocumentNumber}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date d'expiration du document d'identification
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.supportingDocumentExpirationDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Statut matrimonial
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {client.maritalStatus}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default ClientInfos;
