import { ThemeOptions } from '@mui/material';

export const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000'
  },
  primary: {
    50: '#E6FBFF',
    100: '#CCF7FE',
    200: '#99EEFD',
    300: '#66E6FC',
    400: '#33DDFB',
    500: '#00D5FA',
    600: '#00A0BC',
    700: '#006B7D',
    800: '#00353F',
    900: '#001519'
  }
};

// mui theme settings
export const themeSettings = (mode: 'dark' | 'light'): ThemeOptions => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              dark: '#bb86fc',
              main: '#dbb2ff',
              light: '#22c55e'
            },
            secondary: {
              light: '#2dd4bf',
              main: '#14b8a6',
              dark: '#1e293b'
            },
            text: {
              primary: '#f3f4f6',
              secondary: '#f3f4f6'
            },
            background: {
              // default: '#121212'
            }
          }
        : {
            // palette values for light mode
            // primary: {
            //   dark: '#052e16',
            //   main: '#14532d',
            //   light: '#166534'
            // },
            secondary: {
              light: '#2dd4bf',
              main: '#14b8a6',
              dark: '#e5e7eb'
            },
            background: {
              default: '#f3f4f6'
            },
            text: {
              secondary: '#202020'
            }
          })
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
