import * as React from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Menu,
  ClickAwayListener
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from 'store/index';
import FlexBetween from 'components/utils/FlexBetween/FlexBetween';
import { Close, DarkMode, Help, LightMode, Message, Search, Menu as MenuIcon } from '@mui/icons-material';
import { setMode, setLogout } from 'store/authSlice';
import ProfileActions from 'components/templates/ProfileActions/ProfileActions';
import { Notifications } from 'components/templates/Notifications';
import { SiteHeading } from 'components/atoms/SiteHeading';
import ThemeSwitchButton from 'components/molecules/ThemeSwitchButton/ThemeSwitchButton';

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
