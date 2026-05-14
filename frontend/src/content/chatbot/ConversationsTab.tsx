// src/content/chatbot/ConversationsTab.tsx

import { useState, useEffect, useRef, useContext } from 'react';
import {
  Box, Typography, Paper, Grid, Chip, Button, TextField,
  CircularProgress, Alert, Avatar, Divider, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tooltip, Badge,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  ConversationDTO, ChatMessageDTO,
  getAllConversations, getConversation,
  agentIntervene, downloadConversationPdf,
} from './agentChatService';
import { UserContext } from 'src/contexts/UserContext';

// ── Status badge ──
const StatusChip = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; color: any }> = {
    ACTIVE:          { label: 'Active',         color: 'success' },
    AGENT_TOOK_OVER: { label: 'Agent intervenu', color: 'warning' },
    CLOSED:          { label: 'Terminée',        color: 'default' },
    EXPIRED:         { label: 'Expirée',         color: 'error'   },
  };
  const cfg = map[status] ?? { label: status, color: 'default' };
  return <Chip label={cfg.label} color={cfg.color} size="small" />;
};

// ── Bulle de message ──
function MessageBubble({ msg }: { msg: ChatMessageDTO }) {
  const isClient = msg.sender === 'CLIENT';
  const isAgent  = msg.sender === 'AGENT';

  const avatarBg  = isClient ? '#e0e0e0' : isAgent ? '#e65100' : '#1976d2';
  const AvatarIcon = isClient ? PersonIcon : isAgent ? SupportAgentIcon : SmartToyIcon;
  const bubbleBg  = isClient ? '#ffffff' : isAgent ? '#fff3e0' : '#e3f2fd';
  const label     = isClient ? 'Client' : isAgent ? 'Agent' : 'IA';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isClient ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 1,
        mb: 1.5,
      }}
    >
      <Avatar sx={{ bgcolor: avatarBg, width: 30, height: 30 }}>
        <AvatarIcon sx={{ fontSize: 16, color: isClient ? '#555' : 'white' }} />
      </Avatar>
      <Box sx={{ maxWidth: '72%' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 0.3, display: 'block', textAlign: isClient ? 'right' : 'left' }}
        >
          {label} • {msg.timestamp}
        </Typography>
        <Paper
          elevation={1}
          sx={{
            p: 1.5, borderRadius: 2, bgcolor: bubbleBg,
            borderBottomRightRadius: isClient ? 0 : 8,
            borderBottomLeftRadius:  isClient ? 8 : 0,
           }}
>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}>
            {msg.message}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

// ── Composant principal ──
export default function ConversationsTab() {
  const { currentUser, isRecoveryAgent } = useContext(UserContext);

  const [conversations, setConversations]   = useState<ConversationDTO[]>([]);
  const [selected, setSelected]             = useState<ConversationDTO | null>(null);
  const [loading, setLoading]               = useState(false);
  const [refreshing, setRefreshing]         = useState(false);
  const [agentInput, setAgentInput]         = useState('');
  const [sending, setSending]               = useState(false);
  const [error, setError]                   = useState('');
  const [success, setSuccess]               = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Agent peut intervenir, Admin/Manager voient en lecture seule
  const canIntervene = isRecoveryAgent();

  // ── Charger les conversations ──
  const loadConversations = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      // Agent voit uniquement ses conversations, Admin/Manager voient tout
      const userId = isRecoveryAgent() ? currentUser.id : undefined;
      const data = await getAllConversations(userId);
      setConversations(data);
      if (selected) {
        const updated = data.find(c => c.sessionId === selected.sessionId);
        if (updated) setSelected(updated);
      }
    } catch {
      setError('Erreur lors du chargement des conversations.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    loadConversations();
    const interval = setInterval(() => loadConversations(true), 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll vers le bas quand nouveaux messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages]);

  // ── Sélectionner une conversation ──
  const handleSelect = async (sessionId: number) => {
    try {
      const conv = await getConversation(sessionId);
      setSelected(conv);
    } catch {
      setError('Erreur lors du chargement de la conversation.');
    }
  };

  // ── Intervenir ──
  const handleIntervene = async () => {
    if (!selected || !agentInput.trim()) return;
    setSending(true);
    setError('');
    try {
      const reply = await agentIntervene(selected.sessionId, agentInput.trim());
      setSelected(prev => prev
        ? { ...prev, messages: [...prev.messages, reply], status: 'AGENT_TOOK_OVER' }
        : prev
      );
      setAgentInput('');
      setSuccess('Message envoyé au client.');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Erreur lors de l\'intervention.');
    } finally {
      setSending(false);
    }
  };

  // ── Télécharger PDF ──
  const handleDownloadPdf = async () => {
    if (!selected) return;
    try {
      await downloadConversationPdf(selected.sessionId);
    } catch (err: any) {
      console.error('PDF error:', err);
      console.error('Status:', err?.response?.status);
      console.error('Data:', err?.response?.data);
      setError('Erreur lors du téléchargement du PDF.');
    }
  };

  const activeCount = conversations.filter(
    c => c.status === 'ACTIVE' || c.status === 'AGENT_TOOK_OVER'
  ).length;

  // ─── RENDU ────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ p: 2 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          Conversations en cours
        </Typography>
        <Badge badgeContent={activeCount} color="error">
          <Chip label="Actives" color="success" size="small" />
        </Badge>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Tooltip title="Rafraîchir">
            <IconButton onClick={() => loadConversations(true)} disabled={refreshing}>
              {refreshing
                ? <CircularProgress size={20} />
                : <RefreshIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ height: 'calc(100vh - 280px)' }}>

        {/* ── Liste des conversations ── */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}
          >
            <Box sx={{ p: 1.5, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : conversations.length === 0 ? (
              <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>
                Aucune conversation pour le moment.
              </Typography>
            ) : (
              <Box sx={{ overflowY: 'auto', flex: 1 }}>
                {conversations.map(conv => (
                  <Box
                    key={conv.sessionId}
                    onClick={() => handleSelect(conv.sessionId)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      bgcolor: selected?.sessionId === conv.sessionId
                        ? '#e3f2fd' : 'transparent',
                      '&:hover': { bgcolor: '#f5f5f5' },
                      transition: 'background 0.15s',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={700}>
                        {conv.clientPrenom} {conv.clientNom}
                      </Typography>
                      <StatusChip status={conv.status} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Dossier : {conv.caseId}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {conv.createdAt} • {conv.messages.length} message{conv.messages.length !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* ── Détail conversation ── */}
        <Grid item xs={12} md={8}>
          {!selected ? (
            <Paper
              elevation={2}
              sx={{
                height: '100%', borderRadius: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                <SmartToyIcon sx={{ fontSize: 56, opacity: 0.3 }} />
                <Typography mt={1}>
                  Sélectionnez une conversation pour la visualiser
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Paper
              elevation={2}
              sx={{ height: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column' }}
            >
              {/* Header conversation */}
              <Box
                sx={{
                  p: 2, borderBottom: '1px solid #e0e0e0',
                  display: 'flex', alignItems: 'center', gap: 1.5,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {selected.clientPrenom} {selected.clientNom}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Dossier {selected.caseId} • Depuis le {selected.createdAt}
                  </Typography>
                </Box>
                <StatusChip status={selected.status} />
                <Tooltip title="Télécharger PDF">
                  <IconButton onClick={handleDownloadPdf} color="primary">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {selected.messages.length === 0 ? (
                  <Typography color="text.secondary" textAlign="center" mt={4}>
                    Aucun message pour le moment.
                  </Typography>
                ) : (
                  selected.messages.map((msg, idx) => (
                    <MessageBubble key={idx} msg={msg} />
                  ))
                )}
                <div ref={bottomRef} />
              </Box>

              <Divider />

              {/* Zone intervention — visible uniquement pour les agents */}
              {canIntervene && (selected.status === 'ACTIVE' || selected.status === 'AGENT_TOOK_OVER') && (
                <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Intervenir dans la conversation..."
                    value={agentInput}
                    onChange={e => setAgentInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleIntervene();
                      }
                    }}
                    multiline
                    maxRows={3}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleIntervene}
                    disabled={sending || !agentInput.trim()}
                    sx={{ borderRadius: 2, minWidth: 48, px: 2 }}
                  >
                    {sending ? <CircularProgress size={18} /> : <SendIcon />}
                  </Button>
                </Box>
              )}

              {/* Message lecture seule pour Admin/Manager */}
              {!canIntervene && (selected.status === 'ACTIVE' || selected.status === 'AGENT_TOOK_OVER') && (
                <Box sx={{ p: 1.5, bgcolor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
                  <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                    Lecture seule — seuls les agents peuvent intervenir
                  </Typography>
                </Box>
              )}

              {/* Résumé si fermée */}
              {selected.status === 'CLOSED' && (
                <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    RÉSUMÉ GÉNÉRÉ
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    Consultez le PDF pour le résumé complet.
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
