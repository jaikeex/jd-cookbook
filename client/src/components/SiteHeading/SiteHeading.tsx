import { styled, Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import * as React from 'react';

const StyledTypography = styled(Typography)<SiteHeadingProps>((props) => ({
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 2rem, 2.25rem)',
  color: props.theme.palette.primary.main,

  ...(props.isLink && {
    transition: 'color 0.15s',
    '&:hover': {
      color: props.theme.palette.primary.dark,
      cursor: 'pointer'
    }
  })
}));

export interface SiteHeadingProps extends React.PropsWithChildren, TypographyProps {
  isLink?: boolean;
}

const SiteHeading: React.FC<SiteHeadingProps> = ({ children = null, isLink = false }): JSX.Element => (
  <StyledTypography isLink={isLink}>{children}</StyledTypography>
);

export default SiteHeading;
