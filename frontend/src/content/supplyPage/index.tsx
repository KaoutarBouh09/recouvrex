import { Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CasesForm from "./forms/CasesForm";
import ClientsForm from "./forms/ClientsForm";
import InvoicesForm from "./forms/InvoicesForm";
import Footer from "src/components/Footer";
import { Case, Credit, DueDate } from "./supplyModels";
import { ThirdParty } from "src/models/ThirdParty";
import { useState } from "react";
import CreditsForm from "./forms/CreditsFrom";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import SupplyBottomNavigation from "./SupplyBottomNavigation";

export default function SupplyPage() {
  const { type = "" } = useParams();

  const [caseExcelData, setCaseExcelData] = useState<Case[] | null>(null);
  const [thirdPartyExcelData, setThirdPartyExcelData] = useState<
    ThirdParty[] | null
  >(null);
  const [creditExcelData, setCreditExcelData] = useState<Credit[] | null>(null);
  const [dueDateExcelData, setDueDateExcelData] = useState<DueDate[] | null>(
    null
  );

  return (
    <>
      <Helmet>
        <title>Page Alimentation - les {type}</title>
      </Helmet>
      <PageTitleWrapper>
      <Grid
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Alimentation
        </Typography>
        <Typography variant="subtitle2">
        Page Admin d'alimentation pour insérer les données des cas, des clients, des factures ou des crédits.
        </Typography>
      </Grid>
      <Grid item>
        <SupplyBottomNavigation type={type}/>
      </Grid>

    </Grid>
      </PageTitleWrapper>
      <Container maxWidth="xl">
      <Card>
        <Container maxWidth="xl" sx={{ mt: 2, minHeight: "77vh" }}>
          {type === "cases" && (
            <CasesForm
              excelData={caseExcelData}
              setExcelData={setCaseExcelData}
            />
          )}
          {type === "clients" && (
            <ClientsForm
              excelData={thirdPartyExcelData}
              setExcelData={setThirdPartyExcelData}
            />
          )}
          {type === "credits" && (
            <CreditsForm
              excelData={creditExcelData}
              setExcelData={setCreditExcelData}
            />
          )}
          {type === "factures" && (
            <InvoicesForm
              excelData={dueDateExcelData}
              setExcelData={setDueDateExcelData}
            />
          )}
        </Container>
      </Card>
      </Container>
      <Footer />
    </>
  );
}
