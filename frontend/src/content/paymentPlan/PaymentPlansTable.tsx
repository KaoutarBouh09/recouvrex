// src/content/paymentPlan/PaymentPlansTable.tsx

import { FC, useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Label from "src/components/Label";
import {
  getPaymentPlansByCase,
  downloadPaymentPlanPdf,
  PaymentPlanResponseDTO,
} from "src/services/paymentPlanService";

// ✅ Rôles depuis UserContext (pas authUser.ts)
import { UserContext } from "src/contexts/UserContext";

import CreatePaymentPlanDialog from "./CreatePaymentPlanDialog";
import PaymentPlanDetailDialog from "./PaymentPlanDetailDialog";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getStatusLabel = (status: string): JSX.Element => {
  const statusMap: Record<string, { text: string; color: string }> = {
    EN_COURS: { text: "En cours", color: "warning" },
    ACCEPTE:  { text: "Accepté",  color: "success" },
    REJETE:   { text: "Rejeté",   color: "error"   },
    ANNULE:   { text: "Annulé",   color: "error"   },
    TERMINE:  { text: "Terminé",  color: "info"    },
  };
  const info = statusMap[status] ?? { text: status, color: "secondary" };
  return <Label color={info.color as any}>{info.text}</Label>;
};

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface PaymentPlansTableProps {
  caseId: number;
  totalAmount: number;
}

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

const PaymentPlansTable: FC<PaymentPlansTableProps> = ({ caseId, totalAmount }) => {

  // ✅ On récupère les fonctions de rôle depuis UserContext
  const { isAdmin, isRegionResponsable, isRecoveryAgent } = useContext(UserContext);

  const [plans, setPlans] = useState<PaymentPlanResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlanResponseDTO | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // ✅ Permissions selon le rôle
  const canCreate   = isRecoveryAgent() || isAdmin(); // Agent + Admin
  const canValidate = isRegionResponsable() || isAdmin(); // Responsable + Admin

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getPaymentPlansByCase(caseId);
      setPlans(data);
    } catch (error) {
      console.error("Erreur chargement plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [caseId]);

  const handleDownloadPdf = async (planId: number) => {
    try {
      await downloadPaymentPlanPdf(planId);
    } catch (error) {
      console.error("Erreur téléchargement PDF:", error);
    }
  };

  const handleViewDetail = (plan: PaymentPlanResponseDTO) => {
    setSelectedPlan(plan);
    setDetailOpen(true);
  };

  const paginatedPlans = plans.slice(page * limit, page * limit + limit);

  return (
    <>
      <Card>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sm={8}>
            <Typography variant="h3" sx={{ mt: 1, ml: 1 }}>
              Plans de paiement
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Stack
              sx={{
                alignItems: "end",
                justifyContent: "flex-end",
                mr: 2,
                mt: 1,
                flexDirection: "row",
                gap: 1,
              }}
            >
              {/* ✅ Visible uniquement pour Agent et Admin */}
              {canCreate && (
                <CreatePaymentPlanDialog
                  caseId={caseId}
                  totalAmount={totalAmount}
                  onPlanCreated={fetchPlans}
                />
              )}
              <Tooltip arrow title="Réinitialiser">
                <IconButton color="primary" onClick={fetchPlans}>
                  <AutorenewIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 1 }} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 3, pb: 3 }}>
            <CircularProgress />
          </Box>
        ) : plans.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 3, pb: 3 }}>
            <Typography color="text.secondary">
              Aucun plan de paiement pour ce cas.
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ minHeight: 150 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>RÉFÉRENCE</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>STATUT</TableCell>
                  <TableCell>MENSUALITÉ</TableCell>
                  <TableCell>TOTAL AVEC INT.</TableCell>
                  <TableCell>NB ÉCHÉANCES</TableCell>
                  <TableCell>INITIATEUR</TableCell>
                  <TableCell>VALIDATEUR</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPlans.map((plan) => (
                  <TableRow hover key={plan.agreementId}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.agreementCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.agreementDate}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusLabel(plan.status)}</TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.monthlyPaymentAmount?.toFixed(2)} DH
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.totalAmountWithInterest?.toFixed(2)} DH
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.numberOfInstallments}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                        {plan.initiatorName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.secondary" noWrap>
                        {plan.validatorName ?? "—"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip arrow title="Voir les échéances">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewDetail(plan)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Télécharger PDF">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleDownloadPdf(plan.agreementId)}
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box p={2}>
          <TablePagination
            component="div"
            count={plans.length}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Card>

      {/* ✅ canValidate automatique selon le rôle */}
      {selectedPlan && (
        <PaymentPlanDetailDialog
          open={detailOpen}
          plan={selectedPlan}
          onClose={() => setDetailOpen(false)}
          canValidate={canValidate}
          onValidated={fetchPlans}
        />
      )}
    </>
  );
};

export default PaymentPlansTable;
