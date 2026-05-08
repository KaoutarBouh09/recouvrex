import { Grid, Card, Box, Typography, Divider, Autocomplete, TextField, AccordionSummary, AccordionDetails, Accordion, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Credits from "src/content/credits";
import { useEffect } from "react";
import { useClient } from "src/contexts/ClientContext";



const CreditInfos = ()=> {
  
  const { clientData, setClientData } = useClient();


  return (
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Typography variant="h3" >
        Les crédits 
      </Typography>
     
    </AccordionSummary>
    <AccordionDetails>

      <Credits />
    </AccordionDetails>
  </Accordion>

  );
}

export default CreditInfos;
