import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme
} from '@mui/material';
import type { OutlinedInputProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export interface FormPasswordInputProps extends Omit<OutlinedInputProps, 'type' | 'variant'> {
  helperText?: React.ReactNode;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  disabled = false,
  error = false,
  helperText,
  id = 'password-input',
  label = '',
  ...props
}): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme();

  const handleClickIcon = () => {
    setVisible(!visible);
  };

  const handleMouseDownIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel error={error} htmlFor={id} variant="outlined">
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        error={error}
        label={label}
        id={id}
        type={visible ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickIcon} onMouseDown={handleMouseDownIcon} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
              borderRadius: 0
            }
          }
        }}
      />
      <FormHelperText error={error}>{helperText || ' '}</FormHelperText>
    </FormControl>
  );
};

export default FormPasswordInput;
