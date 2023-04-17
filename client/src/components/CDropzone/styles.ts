import { Box, styled } from '@mui/material';

export const OuterBox = styled(Box)((props) => ({
  border: `1px solid ${props.theme.palette.primary.main}`,
  borderRadius: '5px',
  padding: '1rem',

  '&:hover': {
    cursor: 'pointer'
  }
}));

export const InnerBox = styled(Box)((props) => ({
  border: `2px dashed ${props.theme.palette.primary.main}`,
  padding: '1rem'
}));
