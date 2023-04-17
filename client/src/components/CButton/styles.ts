import { Button as MuiButton, styled } from '@mui/material';
import type { CButtonProps } from './CButton';

export const Button = styled(MuiButton, { shouldForwardProp: (prop) => prop !== 'primary' })<CButtonProps>((props) => ({
  borderRadius: 2,
  letterSpacing: props.theme.typography.pxToRem(0.45),

  ...(props.size === 'medium' && {
    padding: `${props.theme.typography.pxToRem(6)} ${props.theme.typography.pxToRem(12)}`
  }),

  ...(props.size === 'large' && {
    padding: `${props.theme.typography.pxToRem(16)} ${props.theme.typography.pxToRem(80)}`
  })
}));
