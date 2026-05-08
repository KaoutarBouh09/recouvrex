import React from 'react';
import { Chip } from '@mui/material';

type NiveauRisque = 'FAIBLE' | 'MOYEN' | 'ÉLEVÉ' | 'ELEVE';

interface Props {
  niveau: string;
}

const RiskBadge: React.FC<Props> = ({ niveau }) => {
  const config: Record<string, { color: string; bg: string; label: string }> = {
    FAIBLE: { color: '#2e7d32', bg: '#e8f5e9', label: '🟢 Risque faible' },
    MOYEN:  { color: '#e65100', bg: '#fff3e0', label: '🟠 Risque moyen' },
    'ÉLEVÉ': { color: '#c62828', bg: '#ffebee', label: '🔴 Risque élevé' },
    ELEVE:  { color: '#c62828', bg: '#ffebee', label: '🔴 Risque élevé' },
  };

  // Normalise la valeur reçue (trim + uppercase)
  const key = niveau?.trim().toUpperCase() ?? 'MOYEN';
  const { color, bg, label } = config[key] ?? config['MOYEN'];

  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: bg,
        color: color,
        fontWeight: 600,
        fontSize: '0.85rem',
        px: 1,
      }}
    />
  );
};

export default RiskBadge;