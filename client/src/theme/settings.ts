import type { ThemeOptions } from '@mui/material';

export const themeSettings = (mode: 'dark' | 'light'): ThemeOptions => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              dark: '#6591D2',
              main: '#9FBAE3',
              light: '#D3E0F2'
            },
            secondary: {
              light: '#2dd4bf',
              main: '#14b8a6',
              dark: '#1e293b'
            },
            text: {
              primary: '#f3f4f6',
              secondary: '#f3f4f6'
            }
          }
        : {
            secondary: {
              light: '#2dd4bf',
              main: '#14b8a6',
              dark: '#B9C4DB'
            },
            background: {
              default: '#eaeaea'
            },
            text: {
              secondary: '#202020'
            }
          })
    },
    breakpoints: {
      values: {
        xs: 425,
        sm: 768,
        md: 1366,
        lg: 1920,
        xl: 2300
      }
    },
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
      fontSize: 16,
      h1: {
        fontSize: 40
      },
      h2: {
        fontSize: 32
      },
      h3: {
        fontSize: 24
      },
      h4: {
        fontSize: 20
      },
      h5: {
        fontSize: 16
      },
      h6: {
        fontSize: 14
      }
    }
  };
};
