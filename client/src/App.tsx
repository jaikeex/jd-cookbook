import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, CreateRecipePage, ProfilePage, RecipePage, AuthPage, Navbar } from 'features';
import { ThemeProvider, CssBaseline, createTheme, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import { CSnackbar } from 'components';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import { makeTheme } from 'theme/theme';
import { EditRecipePage } from 'features/CreateRecipe/pages/EditRecipePage';
import { Page } from 'components/Page/Page';

function App() {
  const mode = useSelector((state: RootState) => state.auth.mode);
  const currentMessage = useSelector((state: RootState) => state.message.currentMessage);
  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Page>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/:pageType" element={<AuthPage />} />
              <Route path="/create" element={<CreateRecipePage />} />
              <Route path="/edit/:_id" element={<EditRecipePage />} />
              <Route path="/recipe/:_id" element={<RecipePage />} />
              <Route path="/profile/:_id" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Page>
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
