import * as React from 'react';
import { TextField, useTheme } from '@mui/material';
import type { OutlinedTextFieldProps } from '@mui/material';

export interface FormTextInputProps extends Omit<OutlinedTextFieldProps, 'variant'> {}

const FormTextInput: React.FC<FormTextInputProps> = ({ helperText = '', label = '', ...props }): JSX.Element => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      variant="outlined"
      label={label}
      helperText={helperText || ' '}
      InputProps={{
        sx: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`
            }
          }
        }
      }}
    />
  );
};

export default FormTextInput;
