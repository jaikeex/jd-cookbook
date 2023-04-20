import { Box, styled, Typography } from '@mui/material';
import type { SiteHeadingProps } from './SiteHeading';

export const Root = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
});

export const Image = styled('img')((props) => ({
  width: '100px',
  transform: 'translateY(20%)',
  opacity: '0.7',
  display: 'none',

  [props.theme.breakpoints.up('sm')]: {
    display: 'block'
  }
}));

export const Title = styled(Typography, {
  shouldForwardProp(propName) {
    return propName !== 'isLink';
  }
})<SiteHeadingProps>((props) => ({
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 2rem, 2.25rem)',
  color: props.theme.palette.primary.main,
  transition: 'color 0.15s',

  ...(props.isLink && {
    cursor: 'pointer',
    '&:hover': {
      color: props.theme.palette.primary.dark
    }
  })
}));
