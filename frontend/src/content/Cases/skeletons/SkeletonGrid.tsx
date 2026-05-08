// SkeletonGrid.tsx
import React from 'react';
import { Grid } from '@mui/material';
import CardSkeleton from './CardSkeleton';


const SkeletonGrid: React.FC = () => (
  <Grid container spacing={2}>
    {[...Array(8)].map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </Grid>
);

export default SkeletonGrid;
