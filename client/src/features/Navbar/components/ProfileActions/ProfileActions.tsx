import React, { useCallback } from 'react';
import { AccountCircle, Login } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useLogout } from '@navbar/hooks';
import type { User } from 'types';
import { Link, useNavigate } from 'react-router-dom';

export interface ProfileActionsProps {
  user?: User | null;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ user = null }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { logout } = useLogout();

  const sm = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!user) {
        navigate('/auth/login');
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [navigate, setAnchorEl, user]
  );

  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  const handleLogoutClick = useCallback(async () => {
    if (await logout()) {
      handleClose();
      navigate('/');
    }
  }, [handleClose, navigate, logout]);

  const rootElement = sm ? (
    <IconButton onClick={handleClick}>{user ? <AccountCircle /> : <Login />}</IconButton>
  ) : (
    <Button onClick={handleClick}>{user?.username || 'LOGIN'}</Button>
  );

  return (
    <div data-testid="navbar-profile-actions">
      {rootElement}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          disablePadding: true
        }}
      >
        <Link to={`/profile/${user?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileActions;
