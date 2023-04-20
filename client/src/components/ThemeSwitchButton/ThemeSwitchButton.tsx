import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import * as React from 'react';

export interface ThemeSwitchButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

const ThemeSwitchButton: React.FC<ThemeSwitchButtonProps> = ({ onClick }): JSX.Element => {
  const theme = useTheme();

  return (
    <IconButton onClick={onClick}>
      {theme.palette.mode === 'light' ? (
        <DarkModeIcon sx={{ fontSize: '25px' }} />
      ) : (
        <LightModeIcon sx={{ fontSize: '25px' }} />
      )}
    </IconButton>
  );
};

export default ThemeSwitchButton;
