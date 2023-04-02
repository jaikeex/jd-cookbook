import titleImg from 'assets/title.jpg';
import React, { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import TitlePage from 'pages/TitlePage/TitlePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index';
import NavBar from 'components/Navbar/Navbar';
import { themeSettings } from 'theme';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import RecipePage from 'pages/RecipePage/RecipePage';

function App() {
  const mode = useSelector((state: RootState) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
