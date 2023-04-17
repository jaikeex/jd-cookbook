import { Card as MuiCard, CardContent as MuiCardContent, styled } from '@mui/material';

export const Card = styled(MuiCard)({
  width: '20rem',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardHeader-subheader': {
    fontSize: '0.75rem'
  }
});

export const CardContent = styled(MuiCardContent)({
  padding: '0.5rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
