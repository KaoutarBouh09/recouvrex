// CardSkeleton.tsx
import React from 'react';
import { Grid, Skeleton, Box } from '@mui/material';

const CardSkeleton: React.FC = () => (
<Grid item xs={12} sm={6} md={3} >
  <Box sx={{ p: 1, border: '1px solid #eee', borderRadius: '8px', height: 70, minHeight: 50 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="10%" />

  </Box>
</Grid>


);

export default CardSkeleton;
