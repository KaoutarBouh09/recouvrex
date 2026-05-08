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

//import CasesTable from "../Cases/CasesTable";
import { UserContext } from "src/contexts/UserContext";

import NewCredit from "./NewCredit";
import { getAllCreditsByThirdPartyId } from "src/utils/api/credit/CreditApi";
import { ThirdParty } from "src/models/ThirdParty";
import { Credit } from "src/models/Credit";
import EditCredit from "./EditCredit";
import { useCredit } from "src/contexts/CreditContext";
import { useClient } from "src/contexts/ClientContext";

const applyPagination = (
  credits: Credit[],
  page: number,
  limit: number
): Credit[] => {
  return credits.slice(page * limit, page * limit + limit);
};

// here it starts
const Credits = () => {
 //context states
  const { clientData, setClientData } = useClient();
  const { creditData, setCreditData } = useCredit();
  //const { cases, fetchCases } = useContext(CaseContext);
  const { currentUser } = useContext(UserContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const selectedBulkActions = selectedCases.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isNewFactOpen, setIsNewFactOpen] = useState(true);
  const [credits, setCredits] = useState([]);

  const fetchCreditsByThirdPartyId = async (clientId:number) => {
    try {
      const results = await getAllCreditsByThirdPartyId(clientId);
      console.log("ALL credits FROM INDEX : ", results);
      setCredits(results);
      setIsNewFactOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCreditsByThirdPartyId(clientData.id);
  }, []);

  useEffect(() => {
    fetchCreditsByThirdPartyId(clientData.id);
  }, [isNewFactOpen]);

  const handlePageChange = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedCredits = applyPagination(credits, page, limit);

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
              {/* <Typography variant="h3" sx={{ mt: 1, ml: 1 }}>
                Les Crédits
              </Typography> */}
              {/* <Grid container spacing={1} alignItems="start">
                  <Grid item xs={10} sm={11}>
                    <ClientSearch setCredits={setCredits} credits={credits}    />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                  <ClientsFilterPopUp  setCredits={setCredits}/>
                  </Grid>
                </Grid> */}
            </Grid>
            <Grid item sm={6}>
              <Stack
                sx={{
                  alignItems: "end",
                  justifyContent: "space-between",
                  mr: 2,
                  direction: "row",
                }}
              >
                <NewCredit setIsNewFactOpen={setIsNewFactOpen} clientData={clientData} />

                <Tooltip arrow title="Réinitialiser">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      fetchCreditsByThirdPartyId(clientData.id);
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
      {credits == null ? (
        <CircularProgress />
      ) : !(credits.length > 0) ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Typography variant="h3">
            Aucun crédit correspondant trouvé
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ minHeight: 150 }}>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell sx={{ minWidth: 40 }}>Action</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Identifiant de crédit</TableCell>
                <TableCell sx={{ minWidth: 150 }}>ID Contrat</TableCell>
                <TableCell sx={{ minWidth: 150 }}>ID Client</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Type de crédit</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Montant nominal</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Déblocage cumulatif</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date de mise en place</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date de la première échéance</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Taux nominal</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Nature du taux</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Nombre d'échéances</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Type de différé</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Restructuré</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Nombre de restructurations</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Statut du crédit</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Montant de l'échéance constante</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Montant impayé</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Montant de l'assurance</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Numéro d'échéance déclenchée</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date d'ouverture</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date de modification</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date du dernier statut</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Montant cumulé des rachats</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Date du dernier rachat</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Agence</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Gestionnaire</TableCell>
               
              </TableRow>

            </TableHead>
            <TableBody>
              {paginatedCredits.map((creditItem) => {
                return (
                  <TableRow hover key={creditItem.id} selected={false}>
                    <TableCell>
                      <EditCredit
                        setIsNewFactOpen={setIsNewFactOpen}
                        credit={creditItem}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                       <Link to={`/credits/${creditItem.creditId}`} onClick={()=> setCreditData(creditItem)}>
                            {creditItem.creditId}
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
                        {creditItem.contract.contractId}
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
                        {creditItem.thirdParty?creditItem.thirdParty.thirdPartyId:null}
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
                        {creditItem.creditType}
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
                        {creditItem.nominalAmount}
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
                        {creditItem.cumulativeDisbursement}
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
                        {creditItem.setupDate}
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
                        {creditItem.firstInstallmentDate} 
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
                        {creditItem.nominalRate}
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
                        {creditItem.rateNature}
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
                        {creditItem.installmentCount}
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
                        {creditItem.deferredType}
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
                        {creditItem.restructured?"OUI":"NON"}
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
                        {creditItem.restructuringCount}
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
                        {creditItem.creditStatus}
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
                        {creditItem.constantInstallmentAmount} 
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
                        {creditItem.unpaidAmount}
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
                        {creditItem.insuranceAmount}
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
                        {creditItem.triggeredInstallmentNumber}
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
                        {creditItem.openingDate}
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
                        {creditItem.modificationDate}
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
                        {creditItem.lastStatusDate}
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
                        {creditItem.cumulativeRedemptionAmount}
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
                        {creditItem.lastRedemptionDate}
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
                        {creditItem.agency}
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
                        {creditItem.manager}
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
          count={credits.length}
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

export default Credits;
