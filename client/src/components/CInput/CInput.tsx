import React from 'react';
import { FormControl } from '@mui/material';
import type { OutlinedInputProps } from '@mui/material';
import * as Styled from './styles';

export interface CInputProps extends OutlinedInputProps {
  helperText?: React.ReactNode;
}

export const CInput: React.FC<CInputProps> = ({
  helperText = '',
  label = '',
  error = false,
  fullWidth = false,
  id = '',
  sx = {},
  ...props
}): JSX.Element => {
  return (
    <FormControl variant="outlined" sx={sx} fullWidth={fullWidth}>
      <Styled.Label error={error} htmlFor={id} variant="outlined" shrink>
        {label}
      </Styled.Label>
      <Styled.Input {...props} />
      {helperText ? <Styled.HelperText error={error}>{helperText}</Styled.HelperText> : null}
    </FormControl>
  );
};
