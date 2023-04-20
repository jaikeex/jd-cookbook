import React from 'react';
import type { TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material';
import * as Styled from './styles';
import logoLight from 'assets/logo-light.png';
import logoDark from 'assets/logo-dark.png';

export interface SiteHeadingProps extends React.PropsWithChildren, TypographyProps {
  isLink?: boolean;
}

const SiteHeading: React.FC<SiteHeadingProps> = ({ children = null, isLink = false }): JSX.Element => {
  const theme = useTheme();

  return (
    <Styled.Root>
      <Styled.Image src={theme.palette.mode === 'light' ? logoLight : logoDark} />
      <Styled.Title isLink={isLink} variant="h1">
        {children}
      </Styled.Title>
    </Styled.Root>
  );
};

export default SiteHeading;
