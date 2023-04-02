import { Button, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from 'store';
import { api } from 'store/apiSlice';
import { setLogout } from 'store/authSlice';

export interface ProfileActionsProps {}

const ProfileActions: React.FC<ProfileActionsProps> = (props): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [trigger] = api.useLazyLogoutQuery();
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
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileActions;
