import React, { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from 'store/index';
import { setMode } from 'store/authSlice';
import { ProfileActions, Notifications } from './components';
import { SiteHeading, ThemeSwitchButton, FlexBetween } from 'components';
import * as Styled from './styles';

export const Navbar: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleSwitchThemes = useCallback(() => {
    dispatch(setMode());
  }, [dispatch, setMode]);

  return (
    <Styled.Root>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <SiteHeading isLink>Cookbook</SiteHeading>
      </Link>
      <Styled.Actions>
        {user && <Notifications />}
        <ThemeSwitchButton onClick={handleSwitchThemes} />
        <ProfileActions user={user} />
      </Styled.Actions>
    </Styled.Root>
  );
};
