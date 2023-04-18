import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from 'features';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import { CSnackbar } from 'components';
import { makeTheme } from 'theme/theme';
import { Page } from 'components/Page/Page';
import { routes } from 'routes';

function App() {
  const themeMode = useSelector((state: RootState) => state.auth.mode);
  const currentMessage = useSelector((state: RootState) => state.message.currentMessage);
  const theme = useMemo(() => makeTheme(themeMode), [themeMode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Page>{routes}</Page>
          {currentMessage && (
            <CSnackbar
              message={currentMessage.message}
              severity={currentMessage.severity}
              testId={currentMessage.origin}
            />
          )}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
