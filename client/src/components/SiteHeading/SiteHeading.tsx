import React from 'react';
import type { TypographyProps } from '@mui/material';
import * as Styled from './styles';
import logo from 'assets/logo.png';

export interface SiteHeadingProps extends React.PropsWithChildren, TypographyProps {
  isLink?: boolean;
}

const SiteHeading: React.FC<SiteHeadingProps> = ({ children = null, isLink = false }): JSX.Element => (
  <Styled.Root>
    <Styled.Image src={logo} width={100} />
    <Styled.Title isLink={isLink} variant="h1">
      {children}
    </Styled.Title>
  </Styled.Root>
);

export default SiteHeading;
