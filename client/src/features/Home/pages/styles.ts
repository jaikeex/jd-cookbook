import { Box, styled } from '@mui/material';
import { device } from 'theme';

export const Recipes = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '3rem',
  marginTop: '3rem',

  [device.sm]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },

  [device.md]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
});
