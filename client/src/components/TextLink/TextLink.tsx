import { Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import type { TypographyVariant } from '@mui/material';

export interface TextLinkProps extends RouterLinkProps {
  variant?: TypographyVariant;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children = null,
  variant = 'subtitle2',
  ...props
}): JSX.Element => {
  return (
    <Typography {...props} component={RouterLink} variant={variant} color="primary" sx={{ textDecoration: 'none' }}>
      {children}
    </Typography>
  );
};
