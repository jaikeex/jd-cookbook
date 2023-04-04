import { useLazyQuery } from '@apollo/client';
import { Button, Menu, MenuItem } from '@mui/material';
import { LOGOUT_QUERY } from 'core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from 'store';
import { setLogout } from 'store/authSlice';

export interface ProfileActionsProps {}

const ProfileActions: React.FC<ProfileActionsProps> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [trigger] = useLazyQuery(LOGOUT_QUERY);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      navigate('/login');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => setAnchorEl(null);

  const logoutClickHandler = () => {
    trigger({});
    handleClose();
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user?.username || 'LOGIN'}
      </Button>
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
