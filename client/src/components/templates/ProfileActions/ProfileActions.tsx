import { AccountCircle, Login } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { LOGOUT_QUERY, useLogout } from 'core';
import type { User } from 'core';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ProfileActionsProps {
  user?: User | null;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ user = null }): JSX.Element => {
  const { logout } = useLogout();
  const sm = useMediaQuery('(max-width:740px)');

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      navigate('/auth/login');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => setAnchorEl(null);

  const logoutClickHandler = async () => {
    if (await logout()) {
      handleClose();
      navigate('/');
    }
  };

  const rootElement = sm ? (
    <IconButton onClick={handleClick}>{user ? <AccountCircle /> : <Login />}</IconButton>
  ) : (
    <Button onClick={handleClick}>{user?.username || 'LOGIN'}</Button>
  );

  return (
    <div>
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
        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileActions;
