import React from 'react';
import { FormControl, Select } from '@mui/material';
import type { SelectProps } from '@mui/material';
import * as Styled from './styles';

export interface CSelectProps extends SelectProps {
  helperText?: React.ReactNode;
}

export const CSelect: React.FC<CSelectProps> = ({
  children = null,
  helperText = '',
  label = '',
  error = false,
  fullWidth = false,
  sx = {},
  id = '',
  ...props
}): JSX.Element => {
  return (
    <FormControl variant="outlined" sx={sx} fullWidth={fullWidth}>
      <Styled.Label error={error} htmlFor={id} variant="outlined" shrink>
        {label}
      </Styled.Label>
      <Styled.Select {...props}>{children}</Styled.Select>
    </FormControl>
  );
};
