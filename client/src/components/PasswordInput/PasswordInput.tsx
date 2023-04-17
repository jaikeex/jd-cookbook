import React from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import type { OutlinedInputProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { CInput } from 'components/CInput';

export interface PasswordInputProps extends Omit<OutlinedInputProps, 'type' | 'variant'> {
  helperText?: React.ReactNode;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  disabled = false,
  error = false,
  helperText,
  id = 'password-input',
  placeholder = '',
  label = '',
  sx = {},
  ...props
}): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClickIcon = () => {
    setVisible(!visible);
  };

  const handleMouseDownIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" sx={sx}>
      <CInput
        {...props}
        error={error}
        label={label}
        placeholder={placeholder}
        id={id}
        type={visible ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickIcon} onMouseDown={handleMouseDownIcon} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error}>{helperText || ' '}</FormHelperText>
    </FormControl>
  );
};
