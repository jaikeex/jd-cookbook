import { HomePage, AuthPage, CreateRecipePage, RecipePage, ProfilePage } from 'features';
import { EditRecipePage } from 'features/CreateRecipe/pages/EditRecipePage';
import { NotFoundPage } from 'pages';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, PathRouteProps, Outlet, Routes } from 'react-router-dom';
import { RootState } from 'store';

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
