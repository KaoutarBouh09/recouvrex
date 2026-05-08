// src/content/chatbot/ChatbotPage.tsx

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  ChatMessage,
  validateAccess,
  sendMessage,
  closeSession,
  getMessages,
} from './chatService';

type Step = 'pin' | 'chat' | 'closed' | 'error';

export default function ChatbotPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [step, setStep] = useState<Step>('pin');
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✅ Polling toutes les 5 secondes pour recevoir les messages de l'agent
  useEffect(() => {
    if (step !== 'chat') return;
    const interval = setInterval(async () => {
      try {
        const allMessages = await getMessages(token, pinCode);
        setMessages(allMessages);
      } catch {}
    }, 5000);
    return () => clearInterval(interval);
  }, [step, token, pinCode]);

  // ── Valider PIN ──
  const handleValidatePin = async () => {
    if (pinCode.length !== 6) {
      setPinError('Le code PIN doit contenir 6 chiffres.');
      return;
    }
    setPinLoading(true);
    setPinError('');
    try {
      await validateAccess(token, pinCode);
      setStep('chat');
      setMessages([
        {
          sender: 'AI',
          message:
            'Bonjour ! Je suis votre conseiller virtuel Recouvrex. Je suis ici pour vous aider à régulariser votre situation. Comment puis-je vous aider ?',
          timestamp: new Date().toLocaleString('fr-FR'),
        },
      ]);
    } catch (e: any) {
      setPinError(e.message ?? 'Code PIN incorrect ou lien expiré.');
    } finally {
      setPinLoading(false);
    }
  };

  // ── Envoyer message ──
  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const clientMsg: ChatMessage = {
      sender: 'CLIENT',
      message: text,
      timestamp: new Date().toLocaleString('fr-FR'),
    };
    setMessages((prev) => [...prev, clientMsg]);
    setInput('');
    setSending(true);
    setErrorMsg('');

    try {
      const reply = await sendMessage(token, pinCode, text);
      setMessages((prev) => [...prev, reply]);
    } catch (e: any) {
      setErrorMsg('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  // ── Clôturer ──
  const handleClose = async () => {
    try {
      await closeSession(token, pinCode);
      setStep('closed');
    } catch {
      setErrorMsg('Erreur lors de la clôture de la session.');
    }
  };

  // ── Rendu PIN ──
  if (step === 'pin') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f0f4f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3 }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <SmartToyIcon sx={{ fontSize: 56, color: '#1976d2' }} />
            <Typography variant="h5" fontWeight={700} mt={1}>
              Recouvrex
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Conseiller virtuel de négociation
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" mb={2}>
            Veuillez entrer le code PIN à 6 chiffres reçu par email pour accéder
            à votre espace de négociation.
          </Typography>

          <TextField
            label="Code PIN"
            value={pinCode}
            onChange={(e) =>
              setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            fullWidth
            inputProps={{ maxLength: 6, style: { letterSpacing: 8, fontSize: 22 } }}
            error={!!pinError}
            helperText={pinError}
            onKeyDown={(e) => e.key === 'Enter' && handleValidatePin()}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleValidatePin}
            disabled={pinLoading}
            sx={{ borderRadius: 2 }}
          >
            {pinLoading ? <CircularProgress size={22} color="inherit" /> : 'Accéder'}
          </Button>
        </Paper>
      </Box>
    );
  }

  // ── Rendu Fermé ──
  if (step === 'closed') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f0f4f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3, textAlign: 'center' }}
        >
          <SmartToyIcon sx={{ fontSize: 56, color: '#2e7d32' }} />
          <Typography variant="h6" fontWeight={700} mt={2}>
            Conversation terminée
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Merci pour cet échange. Un résumé a été transmis à votre conseiller.
            Vous serez recontacté prochainement.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // ── Rendu Chat ──
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f0f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 700,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#1976d2',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <SmartToyIcon sx={{ color: 'white', fontSize: 32 }} />
          <Box>
            <Typography variant="h6" color="white" fontWeight={700}>
              Conseiller Recouvrex
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">
              En ligne • Réponse instantanée
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip
              label="Terminer"
              onClick={handleClose}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
              }}
            />
          </Box>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} msg={msg} />
          ))}
          {sending && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                <SmartToyIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: '#e3f2fd' }}>
                <CircularProgress size={16} />
              </Paper>
            </Box>
          )}
          <div ref={bottomRef} />
        </Box>

        {/* Error */}
        {errorMsg && (
          <Box sx={{ px: 2 }}>
            <Alert severity="error" onClose={() => setErrorMsg('')}>
              {errorMsg}
            </Alert>
          </Box>
        )}

        {/* Input */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="Écrivez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            size="small"
            multiline
            maxRows={3}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={sending || !input.trim()}
            sx={{ borderRadius: 2, minWidth: 48, px: 2 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

// ── Composant bulle de message ──
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isClient = msg.sender === 'CLIENT';
  const isAgent = msg.sender === 'AGENT';

  const avatarBg = isClient ? '#e0e0e0' : isAgent ? '#e65100' : '#1976d2';
  const AvatarIcon = isClient ? PersonIcon : isAgent ? SupportAgentIcon : SmartToyIcon;
  const bubbleBg = isClient ? '#ffffff' : isAgent ? '#fff3e0' : '#e3f2fd';
  const label = isClient ? 'Vous' : isAgent ? 'Agent' : 'Conseiller';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isClient ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 1,
      }}
    >
      <Avatar sx={{ bgcolor: avatarBg, width: 32, height: 32 }}>
        <AvatarIcon sx={{ fontSize: 18, color: isClient ? '#555' : 'white' }} />
      </Avatar>
      <Box sx={{ maxWidth: '75%' }}>
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
            p: 1.5,
            borderRadius: 2,
            bgcolor: bubbleBg,
            borderBottomRightRadius: isClient ? 0 : 8,
            borderBottomLeftRadius: isClient ? 8 : 0,
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {msg.message}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}