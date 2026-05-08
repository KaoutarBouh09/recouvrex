import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, CircularProgress,
  Typography, Divider, Alert
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import RiskBadge from './RiskBadge';
import ActionRecommendations from './ActionRecommendations';
import { analyzeByCaseId, SmartAssistantResponse } from '../../services/smartAssistantService';

interface Props {
  caseId: number;
}

const SmartAssistantPanel: React.FC<Props> = ({ caseId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartAssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeByCaseId(caseId);
      setResult(response);
    } catch (e) {
      setError("Erreur lors de l'analyse. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: '#7c3aed' }} />
          <Typography variant="subtitle1" fontWeight={700}>
            Smart Assistant
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {!result && !loading && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Analysez ce dossier pour obtenir des recommandations personnalisées.
            </Typography>
            <Button
              variant="contained"
              onClick={handleAnalyze}
              startIcon={<AutoAwesomeIcon />}
              sx={{
                backgroundColor: '#7c3aed',
                '&:hover': { backgroundColor: '#6d28d9' },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Analyser le dossier
            </Button>
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress size={32} sx={{ color: '#7c3aed', mb: 1.5 }} />
            <Typography variant="body2" color="text.secondary">
              Analyse en cours...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && !loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                NIVEAU DE RISQUE
              </Typography>
              <RiskBadge niveau={result.niveauRisque} />
            </Box>

            <Divider />

            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                RÉSUMÉ
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                {result.resume}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
                ACTIONS RECOMMANDÉES
              </Typography>
              <ActionRecommendations actions={result.actions} />
            </Box>

            <Divider />

            <Button
              variant="outlined"
              size="small"
              onClick={handleAnalyze}
              startIcon={<RefreshIcon />}
              sx={{
                borderColor: '#7c3aed',
                color: '#7c3aed',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { borderColor: '#6d28d9', backgroundColor: '#f5f3ff' },
              }}
            >
              Réanalyser
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartAssistantPanel;