import titleImg from 'assets/title.jpg';
import React, { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import TitlePage from 'pages/TitlePage/TitlePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { ThemeProvider, CssBaseline, createTheme, Snackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import NavBar from 'components/Navbar/Navbar';
import { themeSettings } from 'theme';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import RecipePage from 'pages/RecipePage/RecipePage';
import { CreateRecipePage } from 'pages/CreateRecipePage';
import { useMessage } from 'hooks/useMessage';
import { CSnackbar } from 'components/CSnackbar/CSnackbar';
import ProfilePage from 'pages/ProfilePage/ProfilePage';

function App() {
  const mode = useSelector((state: RootState) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const currentMessage = useMessage();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recipe/:_id" element={<RecipePage />} />
            <Route path="/create" element={<CreateRecipePage />} />
            <Route path="/profile/:_id" element={<ProfilePage />} />
          </Routes>
          {currentMessage.message && (
            <CSnackbar
              message={currentMessage.message}
              severity={currentMessage.severity}
              timestamp={currentMessage.timestamp}
              testId={currentMessage.origin}
            />
          )}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
