
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import CreditInfos from './CreditInfos';
import ClientInfos from './ClientInfos';
import { useClient } from 'src/contexts/ClientContext';


const ClientDetails = () => {


 

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
            <ClientInfos />
          </Grid>
          <Grid item sm={12}>
            <CreditInfos />
          </Grid>
         
         
        </Grid>
      </Container>
      
  )
}

export default ClientDetails;