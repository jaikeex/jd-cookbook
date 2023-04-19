import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Badge, Popover, List, ListItemText, ListItemButton, useTheme, ListItem } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from '@navbar/hooks';

const Notifications: React.FC = () => {
  const theme = useTheme();
  const { notifications, markAsSeen, unseenCount } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleNotificationsOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleNotificationsClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleClickNotifications = useCallback(
    (id: string) => () => {
      markAsSeen(id);
      handleNotificationsClose();
    },
    [markAsSeen, handleNotificationsClose]
  );

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
                onClick={handleClickNotifications(_id)}
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
