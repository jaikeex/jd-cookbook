import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import type { RootState } from 'store/index';
import { setMode } from 'store/authSlice';
import { ProfileActions, Notifications } from './components';
import { SiteHeading, ThemeSwitchButton } from 'components';
import * as Styled from './styles';

export const Navbar: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSwitchThemes = useCallback(() => {
    dispatch(setMode());
  }, [dispatch, setMode]);

  return (
    <Styled.Root component={'nav'}>
      <Link to="/" reloadDocument={location.pathname === '/'} style={{ textDecoration: 'none' }}>
        <SiteHeading isLink>CookHound</SiteHeading>
      </Link>
      <Styled.Actions>
        {user ? <Notifications /> : null}
        <ThemeSwitchButton onClick={handleSwitchThemes} />
        <ProfileActions user={user} />
      </Styled.Actions>
    </Styled.Root>
  );
};
