import React from 'react';
import {
  Box, Typography, Chip, Divider
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { ActionRecommandee } from '../../services/smartAssistantService';

interface Props {
  actions: ActionRecommandee[];
}

const prioriteConfig = {
  HAUTE:   { color: '#c62828', bg: '#ffebee', label: 'Haute' },
  MOYENNE: { color: '#e65100', bg: '#fff3e0', label: 'Moyenne' },
  BASSE:   { color: '#2e7d32', bg: '#e8f5e9', label: 'Basse' },
};

const getIcon = (titre: string) => {
  const t = titre.toLowerCase();
  if (t.includes('appel') || t.includes('contact')) return <PhoneIcon fontSize="small" />;
  if (t.includes('contentieux') || t.includes('escal')) return <GavelIcon fontSize="small" />;
  if (t.includes('email') || t.includes('relance')) return <EmailIcon fontSize="small" />;
  if (t.includes('risque') || t.includes('alert')) return <WarningAmberIcon fontSize="small" />;
  return <LightbulbIcon fontSize="small" />;
};

const ActionRecommendations: React.FC<Props> = ({ actions }) => {
  if (!actions?.length) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {actions.map((action, index) => {
        const pConfig = prioriteConfig[action.priorite] ?? prioriteConfig['MOYENNE'];
        return (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: pConfig.color }}>{getIcon(action.titre)}</Box>
                <Typography variant="body2" fontWeight={600}>
                  {action.titre}
                </Typography>
                <Chip
                  label={pConfig.label}
                  size="small"
                  sx={{
                    ml: 'auto',
                    backgroundColor: pConfig.bg,
                    color: pConfig.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 3.5 }}>
                {action.description}
              </Typography>
            </Box>
            {index < actions.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default ActionRecommendations;