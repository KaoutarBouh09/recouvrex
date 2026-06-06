// src/content/paymentPlan/PaymentPlansTable.tsx

import { FC, useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Button,
  TextField,
  Alert,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import Label from "src/components/Label";
import {
  getPaymentPlansByCase,
  downloadPaymentPlanPdf,
  deletePaymentPlan,
  updatePaymentPlan,
  UpdatePaymentPlanDTO,
  PaymentPlanResponseDTO,
} from "src/services/paymentPlanService";

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
  const { isAdmin, isRegionResponsable, isRecoveryAgent } = useContext(UserContext);

  const [plans, setPlans] = useState<PaymentPlanResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlanResponseDTO | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // ✅ Permissions selon le rôle
  const canCreate = isRecoveryAgent(); // Agent uniquement
  const canValidate = isRegionResponsable() || isAdmin();
  const canEdit = isRecoveryAgent(); // Agent uniquement

  // ── État pour la suppression ──
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PaymentPlanResponseDTO | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // ── État pour la modification ──
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<PaymentPlanResponseDTO | null>(null);
  const [editNbInstallments, setEditNbInstallments] = useState<string>("");
  const [editInterestRate, setEditInterestRate] = useState<string>("0");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

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

  // ── Supprimer ──
  const handleDeleteClick = (plan: PaymentPlanResponseDTO) => {
    setPlanToDelete(plan);
    setDeleteError("");
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!planToDelete) return;
    setDeleteLoading(true);
    try {
      await deletePaymentPlan(planToDelete.agreementId);
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
      fetchPlans();
    } catch (error) {
      setDeleteError("Erreur lors de la suppression du plan.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Modifier ──
  const handleEditClick = (plan: PaymentPlanResponseDTO) => {
    setPlanToEdit(plan);
    setEditNbInstallments(String(plan.numberOfInstallments));
    setEditInterestRate(
      plan.totalAmount > 0
        ? String(((plan.interestAmount / plan.totalAmount) * 100).toFixed(2))
        : "0"
    );
    setEditDescription("");
    setEditError("");
    setEditSuccess("");
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!planToEdit) return;
    const nb = parseInt(editNbInstallments);
    const rate = parseFloat(editInterestRate);
    if (!nb || nb < 1) { setEditError("Le nombre de mensualités est requis (min: 1)"); return; }
    if (rate < 0)       { setEditError("Le taux d'intérêt ne peut pas être négatif"); return; }

    const dto: UpdatePaymentPlanDTO = {
      numberOfInstallments: nb,
      interestRate: rate,
      description: editDescription || undefined,
    };

    setEditLoading(true);
    try {
      await updatePaymentPlan(planToEdit.agreementId, dto);
      setEditSuccess("Plan modifié avec succès !");
      setTimeout(() => {
        setEditDialogOpen(false);
        setPlanToEdit(null);
        setEditSuccess("");
        fetchPlans();
      }, 1500);
    } catch (error) {
      setEditError("Erreur lors de la modification du plan.");
    } finally {
      setEditLoading(false);
    }
  };

  // Aperçu recalculé en temps réel dans le dialog de modification
  const editNb = parseInt(editNbInstallments) || 0;
  const editRate = parseFloat(editInterestRate) || 0;
  const editInterestAmt = planToEdit ? planToEdit.totalAmount * (editRate / 100) : 0;
  const editTotalWithInterest = planToEdit ? planToEdit.totalAmount + editInterestAmt : 0;
  const editMonthly = editNb > 0 ? (editTotalWithInterest / editNb).toFixed(2) : "0.00";

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
            <Stack sx={{ alignItems: "end", justifyContent: "flex-end", mr: 2, mt: 1, flexDirection: "row", gap: 1 }}>
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
            <Typography color="text.secondary">Aucun plan de paiement pour ce cas.</Typography>
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
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip arrow title="Voir les échéances">
                          <IconButton color="primary" size="small" onClick={() => handleViewDetail(plan)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Télécharger PDF">
                          <IconButton color="secondary" size="small" onClick={() => handleDownloadPdf(plan.agreementId)}>
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {/* ✅ Modifier : Agent + statut EN_COURS */}
                        {canEdit && plan.status === "EN_COURS" && (
                          <Tooltip arrow title="Modifier le plan">
                            <IconButton color="warning" size="small" onClick={() => handleEditClick(plan)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {/* ✅ Supprimer : Agent + statut EN_COURS ou REJETE */}
                        {canEdit && (plan.status === "EN_COURS" || plan.status === "REJETE") && (
                          <Tooltip arrow title="Supprimer le plan">
                            <IconButton color="error" size="small" onClick={() => handleDeleteClick(plan)}>
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
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

      {/* ✅ Dialog détail */}
      {selectedPlan && (
        <PaymentPlanDetailDialog
          open={detailOpen}
          plan={selectedPlan}
          onClose={() => setDetailOpen(false)}
          canValidate={canValidate}
          canEdit={canEdit}
          onValidated={fetchPlans}
          onUpdated={fetchPlans}
        />
      )}

      {/* ✅ Dialog confirmation suppression */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment supprimer le plan <strong>{planToDelete?.agreementCode}</strong> ?
            Cette action est irréversible.
          </DialogContentText>
          {deleteError && <Alert severity="error" sx={{ mt: 1 }}>{deleteError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>Annuler</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={deleteLoading}>
            {deleteLoading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Dialog modification plan */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h3">Modifier le plan — {planToEdit?.agreementCode}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <TextField
                size="small" label="Nombre de mensualités *" type="number" fullWidth
                value={editNbInstallments}
                inputProps={{ min: 1, max: 120 }}
                onChange={(e) => { setEditNbInstallments(e.target.value); setEditError(""); }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small" label="Taux d'intérêt (%)" type="number" fullWidth
                value={editInterestRate}
                inputProps={{ min: 0, step: 0.1 }}
                onChange={(e) => { setEditInterestRate(e.target.value); setEditError(""); }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small" label="Description (optionnel)" fullWidth multiline rows={2}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Laisser vide pour conserver la description actuelle"
              />
            </Grid>
            {editNb > 0 && (
              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Nouveau récapitulatif :</strong>
                    &nbsp; Total avec intérêts : <strong>{editTotalWithInterest.toFixed(2)} DH</strong>
                    &nbsp;|&nbsp; Mensualité : <strong>{editMonthly} DH</strong>
                    &nbsp;|&nbsp; Durée : <strong>{editNb} mois</strong>
                  </Typography>
                </Alert>
              </Grid>
            )}
            {editError && <Grid item xs={12}><Alert severity="error">{editError}</Alert></Grid>}
            {editSuccess && <Grid item xs={12}><Alert severity="success">{editSuccess}</Alert></Grid>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleEditSave} disabled={editLoading}>
            {editLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button onClick={() => setEditDialogOpen(false)} disabled={editLoading}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentPlansTable;
