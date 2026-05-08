// src/content/dashboards/main/index.tsx

import { Helmet } from 'react-helmet-async';
import PageHeader from './header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import NbrCasesByStatus from './charts/NbrCasesByStatus';
import TotalAmountByCaseStatus from './charts/TotalAmountByCaseStatus';
import { useContext, useState } from 'react';
import SelectForm from './exportCharts/SelectForm';
import { UserContext } from 'src/contexts/UserContext';
import TaskToDo from './header/TaskToDo';
import ConversationsTab from 'src/content/chatbot/ConversationsTab';

function DashboardMain() {
  const { currentUser } = useContext(UserContext);
  const [percentageAmountRecovred, setpercentageAmountRecovred] = useState();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Header */}
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h3" marginLeft={4}>Dashboard</Typography>
        </Grid>
        <Grid item xs={1}>
          <SelectForm />
        </Grid>
        <Grid item xs={12}>
          <TaskToDo />
        </Grid>
      </Grid>

      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 4, mt: 1 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          <Tab label="Tableau de bord" />
          <Tab label="Conversations clients" />
        </Tabs>
      </Box>

      {/* ── Onglet 0 : Dashboard ── */}
      {activeTab === 0 && (
        <div id="allCharts">
          <PageTitleWrapper>
            <PageHeader percentageAmountRecovred={percentageAmountRecovred} />
          </PageTitleWrapper>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item xs={12}>
                <NbrCasesByStatus />
              </Grid>
              <Grid item xs={12}>
                <TotalAmountByCaseStatus
                  setpercentageAmountRecovred={setpercentageAmountRecovred}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}

      {/* ── Onglet 1 : Conversations ── */}
      {activeTab === 1 && (
        <ConversationsTab />
      )}
    </>
  );
}

export default DashboardMain;