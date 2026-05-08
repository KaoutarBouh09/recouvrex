import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container, Box } from "@mui/material";
import Footer from "src/components/Footer";
import { useParams } from "react-router-dom";
import CaseHeader from "./CaseHeader";
import CaseReferences from "./caseReferences";
import CaseTasks from "./caseTasks";
import CaseIntervenants from "./caseIntervenants";
import CaseNonPaidInvoices from "./caseNonPaidInvoices";
import CaseDossierContentieux from "./caseDossierContentieux";
import { CaseContext } from "src/contexts/CaseContext";
import { useContext, useEffect, useState } from "react";
import Agreements from "./agreement";
import Skeleton from "@mui/material/Skeleton";
import { UserContext } from "src/contexts/UserContext";
import PaymentPlansTable from "src/content/paymentPlan/PaymentPlansTable";

// ✅ NEW : Smart Assistant
import SmartAssistantPanel from "src/content/smartAssistant/SmartAssistantPanel";

function Case() {
  const { currentUser } = useContext(UserContext);
  const { id = "" } = useParams();
  const { cases, setSelectedCase, selectedCase, fetchCases } =
    useContext(CaseContext);

  const [refrechAgreements, setRefrechAgreements] = useState(false);
  const [isAgreementsNotEmpty, setIsAgreementsNotEmpty] = useState(false);
  const [isArgumentsDownloading, setIsArgumentsDownloading] = useState(true);
  const [isDueDateStatusChange, setIsDueDateStatusChange] = useState(false);

  useEffect(() => {
    if (id && cases.length > 0) {
      const selected = cases.find((c) => c.caseId == id);
      if (selected) {
        setSelectedCase(selected);
      }
    } else if (cases.length == 0) {
      fetchCases();
    }
  }, [id, currentUser]);

  useEffect(() => {
    if (id && cases.length > 0) {
      const selected = cases.find((c) => c.caseId == id);
      if (selected) {
        setSelectedCase(selected);
      }
    }
  }, [cases, currentUser]);

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>

      <PageTitleWrapper>
        <CaseHeader
          setIsDueDateStatusChange={setIsDueDateStatusChange}
          isDueDateStatusChange={isDueDateStatusChange}
          setRefrechAgreements={setRefrechAgreements}
        />
      </PageTitleWrapper>

      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          {isAgreementsNotEmpty ? (
            <Grid item sm={12} marginBottom={5}>
              {isArgumentsDownloading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="100%"
                  height={100}
                />
              ) : (
                <Agreements
                  setRefrechAgreements={setRefrechAgreements}
                  refrechAgreements={refrechAgreements}
                  setIsAgreementsNotEmpty={setIsAgreementsNotEmpty}
                  setIsArgumentsDownloading={setIsArgumentsDownloading}
                />
              )}
            </Grid>
          ) : null}

          <Grid item sm={12}>
            <CaseDossierContentieux />
          </Grid>

          <Grid item xs={12} lg={4.5}>
            <CaseReferences />
          </Grid>

          <Grid item xs={12} lg={7.5}>
            <CaseTasks />
          </Grid>

          <Grid item xs={12}>
            <CaseIntervenants />
          </Grid>

          <Grid item xs={12}>
            <CaseNonPaidInvoices
              setIsDueDateStatusChange={setIsDueDateStatusChange}
              isDueDateStatusChange={isDueDateStatusChange}
            />
          </Grid>

          {/* ✅ NEW : Payment Plans + Smart Assistant */}
          {selectedCase && (
            <Grid item xs={12} marginBottom={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                {/* LEFT : Payment Plans */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <PaymentPlansTable
                    caseId={selectedCase.id}
                    totalAmount={selectedCase.totalAmount}
                  />
                </Box>

                {/* RIGHT : Smart Assistant */}
                <Box
                  sx={{
                    width: 340,
                    flexShrink: 0,
                    position: "sticky",
                    top: 20,
                  }}
                >
                  <SmartAssistantPanel caseId={selectedCase.id} />
                </Box>
              </Box>
            </Grid>
          )}

          {!isAgreementsNotEmpty ? (
            <Grid item sm={12} marginBlock={5}>
              <Agreements
                setRefrechAgreements={setRefrechAgreements}
                refrechAgreements={refrechAgreements}
                setIsAgreementsNotEmpty={setIsAgreementsNotEmpty}
                setIsArgumentsDownloading={setIsArgumentsDownloading}
              />
            </Grid>
          ) : null}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Case;