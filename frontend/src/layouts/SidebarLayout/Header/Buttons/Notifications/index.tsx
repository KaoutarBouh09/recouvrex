// src/layouts/SidebarLayout/Header/Buttons/Notifications/index.tsx

import {
  alpha,
  Badge,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { styled } from "@mui/material/styles";
import { UserContext } from "src/contexts/UserContext";
import axiosInstance from "src/config/axiosConfig";

// ─── STYLED BADGE ─────────────────────────────────────────────────────────────

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface UpcomingInstallment {
  id: number;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  status: string;
  agreementCode: string;
  daysUntilDue: number;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getDaysUntilDue = (dueDateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateStr);
  dueDate.setHours(0, 0, 0, 0);
  const diff = dueDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getUrgencyColor = (days: number): "error" | "warning" | "info" => {
  if (days <= 1) return "error";   // aujourd'hui, demain ou en retard
  if (days <= 3) return "warning"; // dans 3 jours
  return "info";                   // dans 7 jours
};

const getUrgencyLabel = (days: number): string => {
  if (days < 0) return `En retard de ${Math.abs(days)} jour(s)`;
  if (days === 0) return "Aujourd'hui !";
  if (days === 1) return "Demain";
  return `Dans ${days} jours`;
};

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [installments, setInstallments] = useState<UpcomingInstallment[]>([]);

  const { currentUser } = useContext(UserContext);

  // ── Appel du nouveau endpoint ──
  const fetchUpcomingInstallments = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/payment-plan/upcoming-installments?userId=${currentUser.id}&daysAhead=7`
      );

      // Enrichir avec le calcul des jours restants
      const enriched: UpcomingInstallment[] = (response.data ?? []).map(
        (inst: any) => ({
          ...inst,
          daysUntilDue: getDaysUntilDue(inst.dueDate),
        })
      );

      // Trier par urgence (plus proche en premier)
      enriched.sort((a, b) => a.daysUntilDue - b.daysUntilDue);

      setInstallments(enriched);
    } catch (error) {
      console.error("Erreur chargement notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage + toutes les 5 minutes
  useEffect(() => {
    fetchUpcomingInstallments();
    const interval = setInterval(fetchUpcomingInstallments, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  const handleOpen = () => {
    setOpen(true);
    fetchUpcomingInstallments(); // Rafraîchir à chaque ouverture
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip arrow title="Notifications échéances">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={installments.length || null}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* ── En-tête ── */}
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notifications échéances</Typography>
          {installments.length > 0 && (
            <Chip
              label={`${installments.length} alerte(s)`}
              color="error"
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </Box>

        <Divider />

        {/* ── Contenu ── */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3, minWidth: 350 }}>
            <CircularProgress size={24} />
          </Box>
        ) : installments.length === 0 ? (
          <Box
            sx={{
              p: 3,
              minWidth: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NotificationsNoneIcon color="disabled" sx={{ fontSize: 40 }} />
            <Typography color="text.secondary" variant="body2">
              Aucune échéance dans les 7 prochains jours
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0, minWidth: 380, maxHeight: 400, overflow: "auto" }}>
            {installments.map((inst, index) => (
              <Box key={inst.id}>
                <ListItem
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 0.5,
                    // Fond légèrement rouge pour les urgences
                    bgcolor:
                      inst.daysUntilDue <= 1
                        ? alpha("#ff1744", 0.04)
                        : "transparent",
                  }}
                >
                  {/* Ligne 1 : référence + badge urgence */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <WarningAmberIcon
                        fontSize="small"
                        color={getUrgencyColor(inst.daysUntilDue)}
                      />
                      <Typography variant="body2" fontWeight="bold">
                        {inst.agreementCode} — Échéance #{inst.installmentNumber}
                      </Typography>
                    </Box>
                    <Chip
                      label={getUrgencyLabel(inst.daysUntilDue)}
                      color={getUrgencyColor(inst.daysUntilDue)}
                      size="small"
                      sx={{ fontSize: "0.7rem", ml: 1 }}
                    />
                  </Box>

                  {/* Ligne 2 : date + montant */}
                  <Box display="flex" gap={2} alignItems="center">
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <CalendarTodayIcon
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {inst.dueDate}
                      </Typography>
                    </Box>
                    <Typography variant="caption" fontWeight="bold" color="primary">
                      {inst.amount?.toFixed(2)} DH
                    </Typography>
                  </Box>
                </ListItem>
                {index < installments.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Popover>
    </>
  );
}

export default HeaderNotifications;
