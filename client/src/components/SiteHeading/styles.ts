import { Box, styled, Typography } from '@mui/material';
import type { SiteHeadingProps } from './SiteHeading';
import { device } from 'theme';

export const Root = styled(Box)((props) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
}));

export const Image = styled('img')({
  width: '100px',
  transform: 'translateY(20%)',
  display: 'none',

  [device.sm]: {
    display: 'block'
  }
});

export const Title = styled(Typography)<SiteHeadingProps>((props) => ({
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
