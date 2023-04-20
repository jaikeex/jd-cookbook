import { Box, styled } from '@mui/material';

export const Root = styled(Box)((props) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  [props.theme.breakpoints.up('sm')]: {
    display: 'grid',
    rowGap: '3rem',
    columnGap: '2rem',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
  }
}));
