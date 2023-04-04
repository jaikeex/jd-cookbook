import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from 'store/index';
import { FlexBetween } from 'components';
import { setMode } from 'store/authSlice';
import { ProfileActions } from './ProfileActions';
import { Notifications } from './Notifications';
import { SiteHeading } from 'components/SiteHeading';
import { ThemeSwitchButton } from './ThemeSwitchButton';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 740px)');
  const alt = theme.palette.secondary.dark;

  return (
    <FlexBetween
      padding={`1rem ${isNonMobileScreens ? '6%' : '0.5rem'}`}
      position="sticky"
      left="0"
      top="0"
      bgcolor={alt}
      zIndex={100}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <SiteHeading isLink>Cookbook</SiteHeading>
      </Link>
      <FlexBetween gap={isNonMobileScreens ? '2rem' : '0.5rem'}>
        {user && <Notifications />}
        <ThemeSwitchButton onClick={() => dispatch(setMode())} />
        <ProfileActions user={user} />
      </FlexBetween>
    </FlexBetween>
  );
};

export default NavBar;
