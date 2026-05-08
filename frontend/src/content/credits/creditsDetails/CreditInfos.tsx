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
import { useCredit } from "src/contexts/CreditContext";
import { Credit } from "src/models/Credit";

const CreditInfos = () => {
  const { clientData, setClientData } = useClient();
  const { creditData, setCreditData } = useCredit();

  const credit: Credit = creditData;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h3">Informations</Typography>
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
                  Type de crédit
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.creditType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Montant nominal
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.nominalAmount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Déblocage cumulatif
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.cumulativeDisbursement}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date de mise en place
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.setupDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date de la première échéance
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.firstInstallmentDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Taux nominal
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.nominalRate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nature du taux
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.rateNature}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nombre d'échéances
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.installmentCount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Type de différé
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.deferredType}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Restructuré
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.restructured ? "Oui" : "Non"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Nombre de restructurations
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.restructuringCount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Statut du crédit
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.creditStatus}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Montant de l'échéance constante
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.constantInstallmentAmount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Montant impayé
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.unpaidAmount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Montant de l'assurance
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.insuranceAmount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Numéro d'échéance déclenchée
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.triggeredInstallmentNumber}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date d'ouverture
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.openingDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date de modification
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.modificationDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date du dernier statut
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.lastStatusDate}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Montant cumulé des rachats
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.cumulativeRedemptionAmount}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4" sx={{ mt: 1, ml: 2 }}>
                  Date du dernier rachat
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, ml: 2 }}>
                  {credit.lastRedemptionDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreditInfos;
