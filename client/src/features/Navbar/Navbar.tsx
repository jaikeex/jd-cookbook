import React, { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from 'store/index';
import { setMode } from 'store/authSlice';
import { ProfileActions, Notifications } from './components';
import { SiteHeading, ThemeSwitchButton, FlexBetween } from 'components';
import logo from 'assets/logo.png';

export const Navbar: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery('(min-width: 740px)');

  const handleSwitchThemes = useCallback(() => {
    dispatch(setMode());
  }, [dispatch, setMode]);

  return (
    <FlexBetween
      padding={`1rem ${isNonMobileScreens ? '6%' : '0.5rem'}`}
      position="sticky"
      left="0"
      top="0"
      height={70}
      bgcolor={theme.palette.secondary.dark}
      zIndex={100}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <SiteHeading isLink>Cookbook</SiteHeading>
      </Link>
      <FlexBetween gap={isNonMobileScreens ? '2rem' : '0.5rem'}>
        {user && <Notifications />}
        <ThemeSwitchButton onClick={handleSwitchThemes} />
        <ProfileActions user={user} />
      </FlexBetween>
    </FlexBetween>
  );
};
