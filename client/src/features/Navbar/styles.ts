import { Box, styled } from '@mui/material';

export const Root = styled(Box)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 0.5rem',
  position: 'sticky',
  top: 0,
  left: 0,
  height: '70px',
  backgroundColor: props.theme.palette.secondary.dark,

  zIndex: 100,

  [props.theme.breakpoints.up('sm')]: {
    padding: '1rem 6%'
  }
}));

export const Actions = styled(Box)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',

  [props.theme.breakpoints.up('sm')]: {
    gap: '2rem'
  }
}));
