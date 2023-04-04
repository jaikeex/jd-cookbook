import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import * as React from 'react';

const StyledButton = styled(Button)<CButtonProps>((props) => ({
  borderRadius: 2,
  letterSpacing: props.theme.typography.pxToRem(0.45),

  ...(props.size === 'medium' && {
    padding: `${props.theme.typography.pxToRem(6)} ${props.theme.typography.pxToRem(12)}`
  }),

  ...(props.size === 'large' && {
    padding: `${props.theme.typography.pxToRem(16)} ${props.theme.typography.pxToRem(80)}`
  })
}));

export interface CButtonProps extends ButtonProps, React.PropsWithChildren {
  primary?: boolean;
  size?: 'medium' | 'large';
}

const CButton: React.FC<CButtonProps> = ({ children, primary = false, size = 'medium', ...props }): JSX.Element => {
  return (
    <StyledButton {...props} primary variant={primary ? 'contained' : 'text'} size={size}>
      {children}
    </StyledButton>
  );
};

export default CButton;
