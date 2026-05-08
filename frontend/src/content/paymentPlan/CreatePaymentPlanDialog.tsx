// src/content/paymentPlan/CreatePaymentPlanDialog.tsx

import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import PaymentIcon from "@mui/icons-material/Payment";

import {
  createPaymentPlan,
  CreatePaymentPlanDTO,
} from "src/services/paymentPlanService";
import { UserContext } from "src/contexts/UserContext";

// ─── STYLED DIALOG (même style que votre projet) ─────────────────────────────

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface CreatePaymentPlanDialogProps {
  caseId: number;
  totalAmount: number;         // montant total du cas (pré-rempli)
  onPlanCreated?: () => void;  // callback pour rafraîchir la liste après création
}

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export default function CreatePaymentPlanDialog({
  caseId,
  totalAmount,
  onPlanCreated,
}: CreatePaymentPlanDialogProps) {
  const { currentUser } = React.useContext(UserContext);

  // ── États du formulaire ──
  const [numberOfInstallments, setNumberOfInstallments] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("0");
  const [firstPaymentDate, setFirstPaymentDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // ── États d'erreur ──
  const [numberOfInstallmentsError, setNumberOfInstallmentsError] = useState(false);
  const [firstPaymentDateError, setFirstPaymentDateError] = useState(false);
  const [interestRateError, setInterestRateError] = useState(false);

  // ── États UI ──
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ── Calculs simulés (aperçu en temps réel) ──
  const nbInstallments = parseInt(numberOfInstallments) || 0;
  const rate = parseFloat(interestRate) || 0;
  const interestAmount = totalAmount * (rate / 100);
  const totalWithInterest = totalAmount + interestAmount;
  const monthlyPayment =
    nbInstallments > 0
      ? (totalWithInterest / nbInstallments).toFixed(2)
      : "0.00";

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    resetFields();
    setOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const resetFields = () => {
    setNumberOfInstallments("");
    setInterestRate("0");
    setFirstPaymentDate("");
    setDescription("");
    setNumberOfInstallmentsError(false);
    setFirstPaymentDateError(false);
    setInterestRateError(false);
  };

  const checkEmptyInputs = (): boolean => {
    let isError = false;

    if (!numberOfInstallments || parseInt(numberOfInstallments) < 1) {
      setNumberOfInstallmentsError(true);
      isError = true;
    }
    if (!firstPaymentDate) {
      setFirstPaymentDateError(true);
      isError = true;
    }
    if (parseFloat(interestRate) < 0) {
      setInterestRateError(true);
      isError = true;
    }

    return isError;
  };

  const handleSave = async () => {
    if (checkEmptyInputs()) {
      setErrorMessage("Les champs obligatoires ne doivent pas être vides.");
      return;
    }

    const dto: CreatePaymentPlanDTO = {
      caseId,
      totalAmount,
      numberOfInstallments: parseInt(numberOfInstallments),
      interestRate: parseFloat(interestRate) || 0,
      firstPaymentDate,
      description,
    };

    try {
      setLoading(true);
      await createPaymentPlan(dto, currentUser.id);
      setSuccessMessage("Plan de paiement créé avec succès !");
      setErrorMessage("");
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage("");
        resetFields();
        onPlanCreated?.();
      }, 2000);
    } catch (error) {
      console.error("Erreur création plan:", error);
      setSuccessMessage("");
      setErrorMessage("Erreur lors de la création du plan de paiement.");
    } finally {
      setLoading(false);
    }
  };

  // ─── RENDU ────────────────────────────────────────────────────────────────

  return (
    <React.Fragment>
      <Tooltip arrow title="Créer un plan de paiement">
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<PaymentIcon fontSize="small" />}
          onClick={handleClickOpen}
          sx={{ mb: 1 }}
        >
          Plan de paiement
        </Button>
      </Tooltip>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="payment-plan-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="payment-plan-dialog-title">
          <Typography variant="h3">Créer un plan de paiement</Typography>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Grid container spacing={3}>

            {/* ── Montant total (lecture seule, pré-rempli depuis le cas) ── */}
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Montant total (DH)"
                fullWidth
                value={totalAmount.toFixed(2)}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>

            {/* ── Taux d'intérêt ── */}
            <Grid item xs={6}>
              <TextField
                size="small"
                id="interestRate"
                label="Taux d'intérêt (%)"
                type="number"
                fullWidth
                value={interestRate}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: 0, step: 0.1 }}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  setInterestRateError(parseFloat(e.target.value) < 0);
                }}
                error={interestRateError}
                helperText={interestRateError ? "Le taux ne peut pas être négatif" : ""}
              />
            </Grid>

            {/* ── Nombre de mensualités ── */}
            <Grid item xs={6}>
              <TextField
                size="small"
                id="numberOfInstallments"
                label="Nombre de mensualités *"
                type="number"
                fullWidth
                value={numberOfInstallments}
                inputProps={{ min: 1, max: 120 }}
                onChange={(e) => {
                  setNumberOfInstallments(e.target.value);
                  setNumberOfInstallmentsError(
                    !e.target.value || parseInt(e.target.value) < 1
                  );
                }}
                error={numberOfInstallmentsError}
                helperText={
                  numberOfInstallmentsError
                    ? "Le nombre de mensualités est requis (min: 1)"
                    : ""
                }
              />
            </Grid>

            {/* ── Date du premier paiement ── */}
            <Grid item xs={6}>
              <TextField
                size="small"
                id="firstPaymentDate"
                label="Date du premier paiement *"
                type="date"
                fullWidth
                value={firstPaymentDate}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                onChange={(e) => {
                  setFirstPaymentDate(e.target.value);
                  setFirstPaymentDateError(!e.target.value);
                }}
                error={firstPaymentDateError}
                helperText={
                  firstPaymentDateError
                    ? "La date du premier paiement est requise"
                    : ""
                }
              />
            </Grid>

            {/* ── Description ── */}
            <Grid item xs={12}>
              <TextField
                size="small"
                id="description"
                label="Description (optionnel)"
                fullWidth
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* ── Aperçu récapitulatif ── */}
            {nbInstallments > 0 && firstPaymentDate && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    <strong>Récapitulatif :</strong>
                    &nbsp; Montant total avec intérêts :{" "}
                    <strong>{totalWithInterest.toFixed(2)} DH</strong> &nbsp;|&nbsp;
                    Mensualité : <strong>{monthlyPayment} DH</strong> &nbsp;|&nbsp;
                    Durée : <strong>{nbInstallments} mois</strong>
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          {/* ── Messages de feedback ── */}
          {successMessage && (
            <Alert
              variant="filled"
              severity="success"
              sx={{ width: "500px", position: "absolute", left: "1%" }}
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "450px", position: "absolute", left: "1%" }}
            >
              {errorMessage}
            </Alert>
          )}

          <Button
            autoFocus
            variant="contained"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
