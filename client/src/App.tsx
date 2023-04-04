import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitlePage from 'pages/TitlePage/TitlePage';
import AuthPage from 'pages/AuthPage/AuthPage';
import { ThemeProvider, CssBaseline, createTheme, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import NavBar from 'components/templates/Navbar/Navbar';
import { themeSettings } from 'theme';
import RecipePage from 'pages/RecipePage/RecipePage';
import { CreateRecipePage } from 'pages/CreateRecipePage';
import { CSnackbar } from 'components/CSnackbar/CSnackbar';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
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
          <NavBar />
          <Box width={md ? (sm ? '23rem' : '47rem') : '70rem'} p={sm ? 3 : 6} m="2rem auto">
            <Routes>
              <Route path="/" element={<TitlePage />} />
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
