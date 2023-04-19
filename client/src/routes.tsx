import React from 'react';
import { HomePage, AuthPage, CreateRecipePage, EditRecipePage, RecipePage, ProfilePage } from 'features';
import { NotFoundPage } from 'pages';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet, Routes } from 'react-router-dom';
import type { RootState } from 'store';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export const routes = (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth/:pageType" element={<AuthPage />} />
    <Route path="/create" element={<ProtectedRoute />}>
      <Route index element={<CreateRecipePage />} />
    </Route>
    <Route path="/edit/:_id" element={<ProtectedRoute />}>
      <Route index element={<EditRecipePage />} />
    </Route>
    <Route path="/recipe/:_id" element={<RecipePage />} />
    <Route path="/profile/:_id" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
