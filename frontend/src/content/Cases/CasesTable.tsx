import { FC, ChangeEvent, useState, useContext } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AutorenewIcon from "@mui/icons-material/Autorenew";
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
} from "@mui/material";

import { Link } from 'react-router-dom';
import Label from "src/components/Label";
import { Case, CaseStatus } from "src/models/case";
import BulkActions from "./BulkActions";
import CasesSearch from "./CasesSearch";
import { CaseContext } from "src/contexts/CaseContext";
import CasesFilterPopUp from "./CasesFilterPopUp";
import Supply from "../supply";

interface CasesTableProps {
  className?: string;
  setSelectedStatusId: React.Dispatch<React.SetStateAction<number>>;
  searchCasesByKeyWord: (keyword: string) => void;
  searchkeyWord: string;
  setSearchkeyWord: React.Dispatch<React.SetStateAction<string>>;
}

interface Filters {
  status?: CaseStatus;
}

const getStatusLabel = (caseStatus: CaseStatus): JSX.Element => {
  console.log(caseStatus + "\n");
  const caseStatusMap = {
     Predouteux:  { text: "Prédouteux", color: "warning"   },
     Douteux:     { text: "Douteux",    color: "secondary" },
     compromis:   { text: "Compromis",  color: "info"      },
     contentieux: { text: "Contentieux",color: "error"     },
     Deces:       { text: "Décès",      color: "error"     },
     Invalidite:  { text: "Invalidité", color: "error"     },
     Termine:     { text: "Terminé",    color: "success"   },
     Radie:       { text: "Radié",      color: "error"     },
};
  

  interface TextColor {
    text: string;
    color:
      | string
      | "primary"
      | "black"
      | "secondary"
      | "error"
      | "warning"
      | "success"
      | "info";
  }


  const defaultLabel = {
    text: "Unknown Status",
    color: "default",
  };

  const statusInfo = caseStatusMap[caseStatus] || defaultLabel;


  const { text, color }: TextColor = statusInfo;

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cases: Case[], filters: Filters): Case[] => {
  return cases.filter((caseItem) => {
    let matches = true;

    if (filters.status && caseItem.status.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cases: Case[],
  page: number,
  limit: number
): Case[] => {
  return cases.slice(page * limit, page * limit + limit);
};

// here it starts
const CasesTable: FC<CasesTableProps> = ({
  setSelectedStatusId,
  searchCasesByKeyWord,
  searchkeyWord,
  setSearchkeyWord,
}) => {
  //context states
  const { cases,fetchCases} = useContext(CaseContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const selectedBulkActions = selectedCases.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<Filters>({
    // status: null,
  });

  // const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handlePageChange = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCases = applyFilters(cases, filters);
  const paginatedCases = applyPagination(filteredCases, page, limit);

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
            <Grid item sm={8}>
              <Typography variant="h3" sx={{ mt: 1, ml: 1 }}>
                Recouvrements
              </Typography>
              <Grid container spacing={1} alignItems="start">
                <Grid item xs={10} sm={8}>
                  <CasesSearch
                    cases={cases}
                    searchCasesByKeyWord={searchCasesByKeyWord}
                    searchkeyWord={searchkeyWord}
                    setSearchkeyWord={setSearchkeyWord}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <CasesFilterPopUp/>
                </Grid>
                <Grid item xs={2} sm={1}>
                <Supply/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Stack
                sx={{
                  alignItems: "end",
                  justifyContent: "space-between",
                  mr: 2,
                }}
              >
                {/* <Button
                  size="small"
                  rel="noopener noreferrer"
                  sx={{ mb: 1 }}
                  variant="contained"
                  startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                  Ajouter
                </Button> */}

                <Tooltip arrow title="Réinitialiser">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedStatusId(0);
                      fetchCases();
                    }}
                  >
                    <AutorenewIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {/* {openFilter && (
                // <CasesFilter handleFilterCases={handleFilterCases} />
                // <CasesFilterPopUp handleFilterCases={handleFilterCases}/>
              )} */}
            </Grid>
          </Grid>
        </>
      )}
      <Divider />
      {!(cases.length > 0) ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ minHeight: 150 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IDENTIFIANT</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>CONTRAT</TableCell>
                <TableCell>FACTURE</TableCell>
                <TableCell>MONTANT</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedCases.map((caseItem) => {
                return (
                  <TableRow hover key={caseItem.id} selected={false}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        <Link to={`/case/${caseItem.caseId}`}>
                          {caseItem.caseId}
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
                        {caseItem.startDate}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ maxWidth: "1200px", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedStatusId(caseItem.status.id);
                      }}
                    >
                      {getStatusLabel(caseItem.status.status)}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {caseItem.thirdParty.title}{" "}
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
                        {caseItem.thirdParty.firstName}{" "}
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
                        {caseItem.thirdParty.lastName}
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
                        {caseItem.thirdParty.tiersType}
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
                        {/* {caseItem.con} */}
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
                        {caseItem.totalAmount} DH
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
          count={filteredCases.length}
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



export default CasesTable;
