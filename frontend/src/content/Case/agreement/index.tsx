import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Grid, IconButton, Typography } from "@mui/material";
import ReferencesTable from "../caseReferences/ReferencesTable";
import { bgcolor, color } from "@mui/system";
import AgreementTable from "./AgreementTable";
import { Agreement } from "src/models/Agreement";
import { getAgreements } from "src/utils/api/agreement/AgreementApi";
import { Link } from "react-router-dom";
import FmdBadOutlinedIcon from "@mui/icons-material/FmdBadOutlined";
import { CaseContext } from "src/contexts/CaseContext";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { getAuthUser } from "src/auth/authUser";
const Agreements = ({setRefrechAgreements,refrechAgreements,setIsAgreementsNotEmpty,setIsArgumentsDownloading}) => {
  const { selectedCase } = React.useContext(CaseContext);
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  const [existNewAgreement,setExistNewAgreement]=React.useState(false)

  const fetchAgreements = async (
    managerId: number | undefined,
    agreementStatus: any
  ) => {
    try {
      const response = await getAgreements(managerId, selectedCase?.id ,agreementStatus);
      setTimeout(()=>{
        setIsArgumentsDownloading(false)
      },2000)
    
      setAgreements(response?.data);
      setExistNewAgreement(false);
      setRefrechAgreements(false)
      response?.data.length>0 ? setIsAgreementsNotEmpty(true) : setIsAgreementsNotEmpty(false)
      
        
          
    //    response?.data.forEach((agreement)=>{
    //     if(agreement.agreementStatus=="EN_COURS"){
    //          setExistNewAgreement(true);
    //          return null;
    //     }

    // })
    setExistNewAgreement(response?.data.some((agreement) => agreement.agreementStatus === "EN_COURS")) 


    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchAgreements(getAuthUser()?.id, null); // user connected 
   
  }, [selectedCase,refrechAgreements]);

   
  return (
    <Grid container>
    <Grid item  xs={12}>
      { agreements.length > 0 ? (
        

    
        <Accordion
         style={existNewAgreement?{ border: " 1px solid #7af062" }:{ backgroundColor: "white" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            // style={existNewAgreement?{ border: " 1px solid #7af062" }:{ backgroundColor: "white" }}
          >
           { existNewAgreement?  <Typography variant="h3"  >
             Agreements <span style={{color:"#7af062", fontSize:"20px"}}>NEW</span>
             
            </Typography>
            :<Typography variant="h3"  >
                  Agreements
                  
           </Typography>}
          
            
          </AccordionSummary>
          <AccordionDetails>
            <AgreementTable
              
              agreements={agreements}
              setAgreements={setAgreements}
              setRefrechAgreements={setRefrechAgreements}
            />
          </AccordionDetails>
        </Accordion>
      
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            // style={{backgroundColor:"#7af062"}}
          >
            <Typography variant="h3">Agreements</Typography>
            <AccordionDetails
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h4">Pas de nouveaux Agreements.</Typography>

              {/* <Link to={`/agreement/agreementHistory`}>
                <Button color="secondary" variant="outlined">
                  voir l'historique Agreements
                </Button>
              </Link> */}
            </AccordionDetails>
          </AccordionSummary>
        </Accordion>
      )}
        </Grid>
    </Grid>
  );
};
export default Agreements;
