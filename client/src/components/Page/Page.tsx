import { styled } from '@mui/material';
import { Box } from '@mui/material';

export const Page = styled(Box)((props) => ({
  margin: '2rem auto',
  padding: '1.5rem',
  width: '100%',

  [props.theme.breakpoints.up('sm')]: {
    padding: '2rem',
    width: '47rem'
  },

  [props.theme.breakpoints.up('md')]: {
    width: '70rem'
  }
}));
