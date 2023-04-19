import { Box, styled } from '@mui/material';
import titleImg from 'assets/title.jpg';

export const Root = styled(Box)({
  position: 'relative',
  padding: '1rem',

  '&::before': {
    content: '""',
    background: `url(${titleImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    opacity: 0.3
  }
});

export const FormWrapper = styled(Box)((props) => ({
  maxWidth: '47rem',
  margin: '0 auto',
  padding: '2rem 0',
  textAlign: 'center',

  [props.theme.breakpoints.up('sm')]: {
    padding: '2rem 4rem'
  }
}));

export const CreateRecipeButton = styled(Box)((props) => ({
  position: 'relative',
  marginTop: '2rem',

  [props.theme.breakpoints.up('sm')]: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
}));
