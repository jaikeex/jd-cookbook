import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Badge, Popover, List, ListItemText, ListItemButton, useTheme, ListItem } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from 'features/Navbar/hooks';

interface Notification {
  _id: string;
  recipe: string;
  seen: boolean;
  text: string;
}

interface NotificationsProps {}

interface NotificationsData {
  getNotifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = () => {
  const theme = useTheme();
  const { notifications, markAsSeen, unseenCount } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const notificationClickHandler = (id: string) => () => {
    markAsSeen(id);
    handleNotificationsClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleNotificationsOpen}>
        <Badge badgeContent={unseenCount} color="secondary">
          <NotificationsIcon sx={{ fontSize: '25px' }} />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List disablePadding sx={{ maxHeight: 300 }}>
          {notifications.length > 0 ? (
            notifications.map(({ recipe, text, _id, seen }) => (
              <ListItemButton
                key={_id}
                component={Link}
                to={`/recipe/${recipe}`}
                onClick={notificationClickHandler(_id)}
              >
                <ListItemText
                  primary={text}
                  sx={{ color: seen ? theme.palette.text.disabled : theme.palette.text.primary }}
                />
              </ListItemButton>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Nothing to display" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;
