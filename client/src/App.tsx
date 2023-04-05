import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, CreateRecipePage, ProfilePage, RecipePage, AuthPage } from 'features';
import { ThemeProvider, CssBaseline, createTheme, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import { Navbar, CSnackbar } from 'components';
import { themeSettings } from 'theme';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

function App() {
  const mode = useSelector((state: RootState) => state.auth.mode);
  const currentMessage = useSelector((state: RootState) => state.message.currentMessage);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Box width={md ? (sm ? '23rem' : '47rem') : '70rem'} p={sm ? 3 : 4} m="2rem auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/:pageType" element={<AuthPage />} />
              <Route path="/create" element={<CreateRecipePage />} />
              <Route path="/recipe/:_id" element={<RecipePage />} />
              <Route path="/profile/:_id" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
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
