import { Box, styled } from '@mui/material';

export const Recipes = styled(Box)((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '3rem',
  marginTop: '3rem',

  [props.theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },

  [props.theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
}));
