import React, { useCallback } from 'react';
import { FormControl, IconButton, InputAdornment } from '@mui/material';
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

  const handleClickIcon = useCallback(() => {
    setVisible(!visible);
  }, [setVisible]);

  const handleMouseDownIcon = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  return (
    <FormControl variant="outlined" sx={sx}>
      <CInput
        {...props}
        error={error}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        type={visible ? 'text' : 'password'}
        helperText={helperText}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickIcon} onMouseDown={handleMouseDownIcon} edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
