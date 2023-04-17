import { createTheme } from '@mui/material';
import { themeSettings } from './settings';

export const makeTheme = (mode: 'dark' | 'light') => {
  return createTheme(themeSettings(mode));
};
