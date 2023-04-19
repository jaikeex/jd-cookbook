import React from 'react';
import type { ButtonProps } from '@mui/material';
import * as Styled from './styles';

export interface CButtonProps extends ButtonProps, React.PropsWithChildren {
  primary?: boolean;
  size?: 'medium' | 'large';
}

export const CButton: React.FC<CButtonProps> = ({
  children,
  primary = false,
  size = 'medium',
  ...props
}): JSX.Element => {
  return (
    <Styled.Button {...props} primary variant={primary ? 'contained' : 'text'} size={size}>
      {children}
    </Styled.Button>
  );
};
