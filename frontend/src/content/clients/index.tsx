import {
  FC,
  ChangeEvent,
  useState,
  useContext,
  useEffect,
  SetStateAction,
} from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  Grid,
  Button,
  Stack,
  makeStyles,
} from "@mui/material";

import { Link } from "react-router-dom";
import Label from "src/components/Label";
import { Case, CaseStatus } from "src/models/case";

import { CaseContext } from "src/contexts/CaseContext";
import BulkActions from "../Cases/BulkActions";
import CasesSearch from "../Cases/CasesSearch";
import CasesFilterPopUp from "../Cases/CasesFilterPopUp";
//import CasesTable from "../Cases/CasesTable";
import NewClient from "./NewClient";
import EditClient from "./EditClient";
import { getAllClientsByUserId, sendEmailToClient } from "src/utils/api/client/ClientApi";
import { UserContext } from "src/contexts/UserContext";
import { getXReferenceLineClasses } from "@mui/x-charts/ChartsReferenceLine/ChartsXReferenceLine";

import ClientsFilterPopUp from "./ClientsFilterPopUp";
import ClientSearch from "./ClientSearch";
import { ThirdParty } from "src/models/ThirdParty";
import {useClient } from "src/contexts/ClientContext";

const applyPagination = (
  thirdParties: ThirdParty[],
  page: number,
  limit: number
): ThirdParty[] => {
  return thirdParties.slice(page * limit, page * limit + limit);
};

// here it starts
const Clients = () => {
  const { clientData, setClientData } = useClient();

 // Example of setting client data
const updateClientData = (clientItem:ThirdParty) => {
  setClientData(clientItem);
};


  //context states
  //const { cases, fetchCases } = useContext(CaseContext);
 // const { userData } = useContext(UserContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const selectedBulkActions = selectedCases.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isNewFactOpen, setIsNewFactOpen] = useState(true);
  const [thirdParties, setThirdParties] = useState([]);

    const fetchAllClientsByUserId = async()=>{
           
      try {
           const results = await getAllClientsByUserId();
           console.log("ALL THIRDPARTY FROM INDEX : " , results);
           setThirdParties(results);
           setIsNewFactOpen(true)
      } catch (error) {
          console.log(error);
      }


    }
  useEffect(() => {
    fetchAllClientsByUserId()
  }, []);
  
  useEffect(() => {
    fetchAllClientsByUserId()
  }, [isNewFactOpen]);


  const handlePageChange = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedClients = applyPagination(thirdParties, page, limit);

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sm={6}>
              <Typography variant="h3" sx={{ mt: 1, ml: 1 }}>
                Les Clients
              </Typography>
              <Grid container spacing={1} alignItems="start">
                <Grid item xs={10} sm={11}>
                  <ClientSearch setThirdParties={setThirdParties} thirdParties={thirdParties}    />
                </Grid>
                <Grid item xs={2} sm={1}>
                <ClientsFilterPopUp  setThirdParties={setThirdParties}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Stack
              
                sx={{
                  alignItems: "end",
                  justifyContent: "space-between",
                  mr: 2,
                  direction:"row"
                  
                }}
              >
               
                <NewClient setIsNewFactOpen={setIsNewFactOpen} />

                <Tooltip arrow title="Réinitialiser">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      fetchAllClientsByUserId();
                    }}
                  >
                    <AutorenewIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
         
          </Grid>
        </>
      )}
      <Divider />
      {thirdParties==null? <CircularProgress /> :
      !(thirdParties.length > 0) ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
         
          <Typography variant="h3" >
          Aucun client correspondant trouvé
              </Typography>
            
        </Box>
      ) :  (
        <TableContainer sx={{ minHeight: 150 }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ minWidth: 40 }}>Action</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Identifiant client</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Type de client</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Titre</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Nom</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Prénom</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Date du naissance</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Raison sociale</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Nationalité</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Pays de résidence</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Secteur d'activité</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Forme juridique</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Profession</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Email personnel</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Email professionnel</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Téléphone personnel</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Téléphone professionnel</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Téléphone fixe</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Numéro de fax</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Registre de commerce</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Type de pièce justificative</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Numéro de pièce justificative</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>date Exp Piece Justificative</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>État civil</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
     
              {paginatedClients.map((clientItem) => {
                return (
                  <TableRow hover key={clientItem.id} selected={false}>
                     <TableCell >
                      <EditClient  setIsNewFactOpen={setIsNewFactOpen} client={clientItem}  />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                  <Link to={`/client/${clientItem.thirdPartyId}`}
                   onClick={() => updateClientData(clientItem)}>
                               {clientItem.thirdPartyId}
                   </Link>

                      
                       
                      </Typography>
                    </TableCell>
           
                
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.tiersType}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.birthDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.companyName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.nationality} DH
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                       
                          {clientItem.countryOfResidence}
                      
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.businessSector}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.legalForm}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.occupation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.personalEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                       {clientItem.businessEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.privatePhone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.businessPhone} DH
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.landLinePhone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.faxNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.commercialRegister}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.supportingDocumentType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.supportingDocumentNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.supportingDocumentExpirationDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {clientItem.maritalStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box p={2}>
        <TablePagination
          component="div"
          count={thirdParties.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};



export default Clients;
