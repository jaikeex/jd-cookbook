import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { IconButton, Badge, Popover, List, ListItem, ListItemText, ListItemButton, useTheme } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { GET_NOTIFICATIONS_QUERY } from 'graphql/queries';
import { MARK_NOTIFICATION_AS_SEEN_MUTATION } from 'graphql/mutations';

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

const Notifications: React.FC<NotificationsProps> = (props) => {
  const theme = useTheme();

  const [markAsSeen] = useMutation(MARK_NOTIFICATION_AS_SEEN_MUTATION);
  const { loading, data } = useQuery<NotificationsData>(GET_NOTIFICATIONS_QUERY, {
    pollInterval: 60000 // Fetch notifications every minute
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const notificationClickHandler = (id: string) => () => {
    handleNotificationsClose();
    markAsSeen({
      variables: { id },
      refetchQueries: [{ query: GET_NOTIFICATIONS_QUERY }]
    });
  };

  const notifications = data?.getNotifications ?? [];

  const unseenNotifications = notifications.filter((notification) => !notification.seen);

  return (
    <>
      <IconButton color="inherit" onClick={handleNotificationsOpen}>
        <Badge badgeContent={unseenNotifications.length} color="secondary">
          <NotificationsIcon sx={{ fontSize: '25px' }} />
        </Badge>
      </IconButton>
      {notifications.length > 0 && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleNotificationsClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <List disablePadding sx={{ maxHeight: 300 }}>
            {notifications.map(({ recipe, text, _id, seen }) => (
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
            ))}
          </List>
        </Popover>
      )}
    </>
  );
};

export default Notifications;
