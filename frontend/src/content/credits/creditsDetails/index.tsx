
import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'

import { useClient } from 'src/contexts/ClientContext';
import CaseNonPaidInvoices from './dueDateDetails/caseNonPaidInvoices';
import Guarantees from './guaranteesDetails/guarantees';
import { useCredit } from 'src/contexts/CreditContext';
import CreditInfos from './CreditInfos';


const CreditsDetails = () => {

  const { creditData, setCreditData } = useCredit();

 

  return (
    <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
           <Grid item sm={12}>
           <Typography variant="h3">
            Crédit
            <span style={{ color: "blue" }}> #{creditData.creditId}</span>
          </Typography>
          <CreditInfos/>
          </Grid>
          
          <Grid item sm={12}>
            <CaseNonPaidInvoices />
          </Grid>

          <Grid item sm={12}>
            <Guarantees />
          </Grid>
         
         
        </Grid>
      </Container>
      
  )
}

export default CreditsDetails;