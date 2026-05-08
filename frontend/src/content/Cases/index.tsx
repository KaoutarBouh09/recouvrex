import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import Footer from "src/components/Footer";
import ExistingCases from "./ExistingCases";
import { useState } from "react";
import Agreements from "../Case/agreement";

function Cases() {
  const [selectedStatusId, setSelectedStatusId] = useState<number>(0);
  const [searchkeyWord, setSearchkeyWord] = useState<string>("");

  return (
    <>
      <Helmet>
        <title>Cases - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          selectedStatusId={selectedStatusId}
          setSelectedStatusId={setSelectedStatusId}
          searchkeyWord={searchkeyWord}
          setSearchkeyWord={setSearchkeyWord}
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
        
          <Grid item xs={12}>
            <ExistingCases
              setSelectedStatusId={setSelectedStatusId}
              selectedStatusId={selectedStatusId}
              searchkeyWord={searchkeyWord}
              setSearchkeyWord={setSearchkeyWord}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Cases;
