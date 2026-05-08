import { useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "src/components/Footer";
import Header from "./Header";
import { Box } from "@mui/system";

function Home() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Recouvrex Home Page</title>
      </Helmet>
      <Navbar />
      <Box sx={{ pt: `${theme.header.height}` }}>
        <Header />
        {/* <Header /> */}
      </Box>
      <Footer />
    </>
  );
}

export default Home;
