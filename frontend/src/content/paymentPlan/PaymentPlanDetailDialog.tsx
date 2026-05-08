// src/content/paymentPlan/PaymentPlanDetailDialog.tsx

import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import Label from "src/components/Label";
import {
  validatePaymentPlan,
  rejectPaymentPlan,
  getReminderHistory,
  PaymentPlanResponseDTO,
  InstallmentDTO,
  ReminderHistoryDTO,
} from "src/services/paymentPlanService";
import { UserContext } from "src/contexts/UserContext";

// ─── STYLED ───────────────────────────────────────────────────────────────────

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getInstallmentStatusLabel = (status: string): JSX.Element => {
  const map: Record<string, { text: string; color: string }> = {
    EN_ATTENTE: { text: "En attente", color: "warning" },
    REGLE:      { text: "Réglé",      color: "success" },
    EN_RETARD:  { text: "En retard",  color: "error"   },
  };
  const info = map[status] ?? { text: status, color: "secondary" };
  return <Label color={info.color as any}>{info.text}</Label>;
};

const getPlanStatusLabel = (status: string): JSX.Element => {
  const map: Record<string, { text: string; color: string }> = {
    EN_COURS: { text: "En cours", color: "warning" },
    ACCEPTE:  { text: "Accepté",  color: "success" },
    REJETE:   { text: "Rejeté",   color: "error"   },
    ANNULE:   { text: "Annulé",   color: "error"   },
    TERMINE:  { text: "Terminé",  color: "info"    },
  };
  const info = map[status] ?? { text: status, color: "secondary" };
  return <Label color={info.color as any}>{info.text}</Label>;
};

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface PaymentPlanDetailDialogProps {
  open: boolean;
  plan: PaymentPlanResponseDTO;
  onClose: () => void;
  canValidate?: boolean;
  onValidated?: () => void;
}

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export default function PaymentPlanDetailDialog({
  open,
  plan,
  onClose,
  canValidate = false,
  onValidated,
}: PaymentPlanDetailDialogProps) {
  const { currentUser } = useContext(UserContext);

  const [activeTab, setActiveTab]   = useState(0);
  const [comment, setComment]       = useState("");
  const [reason, setReason]         = useState("");
  const [rejectMode, setRejectMode] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage]     = useState("");

  // ── Historique relances ──
  const [reminders, setReminders]     = useState<ReminderHistoryDTO[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (open && activeTab === 1 && plan.installments?.length > 0) {
      loadAllReminders();
    }
  }, [open, activeTab]);

  const loadAllReminders = async () => {
    setLoadingHistory(true);
    try {
      // Charger l'historique pour toutes les échéances
      const allReminders = await Promise.all(
        plan.installments.map((inst) => getReminderHistory(inst.id))
      );
      setReminders(allReminders.flat().sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      ));
    } catch (e) {
      console.error("Erreur chargement historique:", e);
    } finally {
      setLoadingHistory(false);
    }
  };

  // ── Valider ──
  const handleValidate = async () => {
    try {
      setLoading(true);
      await validatePaymentPlan(plan.agreementId, currentUser.id, comment);
      setSuccessMessage("Plan validé avec succès !");
      setErrorMessage("");
      setTimeout(() => { setSuccessMessage(""); onValidated?.(); onClose(); }, 2000);
    } catch {
      setErrorMessage("Erreur lors de la validation du plan.");
    } finally {
      setLoading(false);
    }
  };

  // ── Rejeter ──
  const handleReject = async () => {
    if (!reason.trim()) { setErrorMessage("Le motif de rejet est obligatoire."); return; }
    try {
      setLoading(true);
      await rejectPaymentPlan(plan.agreementId, currentUser.id, reason);
      setSuccessMessage("Plan rejeté avec succès !");
      setErrorMessage("");
      setTimeout(() => { setSuccessMessage(""); setRejectMode(false); onValidated?.(); onClose(); }, 2000);
    } catch {
      setErrorMessage("Erreur lors du rejet du plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setComment(""); setReason(""); setRejectMode(false);
    setSuccessMessage(""); setErrorMessage("");
    setActiveTab(0); setReminders([]);
    onClose();
  };

  // ─── RENDU ────────────────────────────────────────────────────────────────

  return (
    <BootstrapDialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h3">Détail du plan — {plan.agreementCode}</Typography>
      </DialogTitle>

      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8, color: (t) => t.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>

        {/* ── ONGLETS ── */}
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
          <Tab label="Détail du plan" />
          <Tab label={`Historique relances ${reminders.length > 0 ? `(${reminders.length})` : ''}`} />
        </Tabs>

        {/* ════════════════════════════════════════════════════════
            ONGLET 0 — Détail du plan
        ════════════════════════════════════════════════════════ */}
        {activeTab === 0 && (
          <>
            {/* Informations générales */}
            <Typography variant="h5" sx={{ mb: 1 }}>Informations générales</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Statut</Typography>
                <Box>{getPlanStatusLabel(plan.status)}</Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Date</Typography>
                <Typography variant="body2" fontWeight="bold">{plan.agreementDate}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Initiateur</Typography>
                <Typography variant="body2" fontWeight="bold">{plan.initiatorName}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Validateur</Typography>
                <Typography variant="body2" fontWeight="bold">{plan.validatorName ?? "—"}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            {/* Détails financiers */}
            <Typography variant="h5" sx={{ mb: 1 }}>Détails financiers</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Montant total</Typography>
                <Typography variant="body2" fontWeight="bold">{plan.totalAmount?.toFixed(2)} DH</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Intérêts</Typography>
                <Typography variant="body2" fontWeight="bold">{plan.interestAmount?.toFixed(2)} DH</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Total avec intérêts</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">{plan.totalAmountWithInterest?.toFixed(2)} DH</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Mensualité</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">{plan.monthlyPaymentAmount?.toFixed(2)} DH</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            {/* Échéancier */}
            <Typography variant="h5" sx={{ mb: 1 }}>
              Échéancier ({plan.numberOfInstallments} mensualités)
            </Typography>
            <TableContainer sx={{ maxHeight: 260 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>N°</TableCell>
                    <TableCell>DATE ÉCHÉANCE</TableCell>
                    <TableCell>MONTANT</TableCell>
                    <TableCell>PAYÉ</TableCell>
                    <TableCell>STATUT</TableCell>
                    <TableCell>DATE PAIEMENT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plan.installments?.map((inst: InstallmentDTO) => (
                    <TableRow hover key={inst.id}>
                      <TableCell><Typography variant="body2" fontWeight="bold">{inst.installmentNumber}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{inst.dueDate}</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight="bold">{inst.amount?.toFixed(2)} DH</Typography></TableCell>
                      <TableCell><Typography variant="body2">{inst.paidAmount?.toFixed(2)} DH</Typography></TableCell>
                      <TableCell>{getInstallmentStatusLabel(inst.status)}</TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{inst.paidDate ?? "—"}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Zone validation */}
            {canValidate && plan.status === "EN_COURS" && (
              <>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 1 }}>Décision de validation</Typography>
                {!rejectMode ? (
                  <TextField
                    size="small" label="Commentaire (optionnel)" fullWidth multiline rows={2}
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Ajouter un commentaire de validation..."
                  />
                ) : (
                  <TextField
                    size="small" label="Motif de rejet *" fullWidth multiline rows={2}
                    value={reason}
                    onChange={(e) => { setReason(e.target.value); if (e.target.value) setErrorMessage(""); }}
                    error={!reason.trim() && !!errorMessage}
                    helperText={!reason.trim() && errorMessage ? "Le motif de rejet est obligatoire" : ""}
                    placeholder="Précisez la raison du rejet..."
                  />
                )}
              </>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════════
            ONGLET 1 — Historique relances
        ════════════════════════════════════════════════════════ */}
        {activeTab === 1 && (
          <>
            {loadingHistory ? (
              <Typography color="text.secondary" sx={{ mt: 2 }}>Chargement...</Typography>
            ) : reminders.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Aucune relance envoyée pour ce plan.
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>DATE</TableCell>
                      <TableCell>CANAL</TableCell>
                      <TableCell>DESTINATAIRE</TableCell>
                      <TableCell>STATUT</TableCell>
                      <TableCell>ERREUR</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reminders.map((r) => (
                      <TableRow hover key={r.id}>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(r.sentAt).toLocaleString("fr-FR")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            icon={r.channel === "EMAIL" ? <EmailIcon /> : <SmsIcon />}
                            label={r.channel}
                            color={r.channel === "EMAIL" ? "primary" : "secondary"}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{r.recipient}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            icon={r.status === "SUCCESS" ? <CheckCircleIcon /> : <ErrorIcon />}
                            label={r.status === "SUCCESS" ? "Succès" : "Échec"}
                            color={r.status === "SUCCESS" ? "success" : "error"}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="error">
                            {r.errorMessage ?? "—"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

      </DialogContent>

      <DialogActions>
        {successMessage && (
          <Alert variant="filled" severity="success" sx={{ width: "500px", position: "absolute", left: "1%" }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && !(!reason.trim() && rejectMode) && (
          <Alert variant="filled" severity="error" sx={{ width: "450px", position: "absolute", left: "1%" }}>
            {errorMessage}
          </Alert>
        )}

        {canValidate && plan.status === "EN_COURS" && (
          <>
            {!rejectMode ? (
              <>
                <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />}
                  onClick={handleValidate} disabled={loading}>
                  {loading ? "Validation..." : "Valider"}
                </Button>
                <Button variant="outlined" color="error" startIcon={<CancelOutlinedIcon />}
                  onClick={() => setRejectMode(true)}>
                  Rejeter
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="error" startIcon={<CancelOutlinedIcon />}
                  onClick={handleReject} disabled={loading}>
                  {loading ? "Rejet..." : "Confirmer le rejet"}
                </Button>
                <Button variant="outlined" onClick={() => { setRejectMode(false); setReason(""); setErrorMessage(""); }}>
                  Annuler
                </Button>
              </>
            )}
          </>
        )}

        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}