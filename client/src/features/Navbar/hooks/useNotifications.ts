import { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { Notification } from 'types';
import { GET_NOTIFICATIONS_QUERY, MARK_NOTIFICATION_AS_SEEN_MUTATION } from '@navbar/graphql';

interface NotificationsData {
  getNotifications: Notification[];
}

interface IUseNotifications {
  notifications: Notification[];
  loading: boolean;
  markAsSeen: (id: string) => void;
  unseenCount: number;
}

export const useNotifications = (): IUseNotifications => {
  const [unseenCount, setUnseenCount] = useState<number>(0);
  const user = useSelector((state: RootState) => state.auth.user);

  const [markNotificationAsSeenMutation] = useMutation(MARK_NOTIFICATION_AS_SEEN_MUTATION);
  const [getNotificationsQuery, { data, loading, stopPolling, startPolling }] = useLazyQuery<NotificationsData>(
    GET_NOTIFICATIONS_QUERY,
    {
      onCompleted(data) {
        setUnseenCount(data.getNotifications.filter((notification) => !notification.seen).length);
      }
    }
  );

  const markAsSeen = (id: string) => {
    markNotificationAsSeenMutation({
      variables: { id },
      refetchQueries: [{ query: GET_NOTIFICATIONS_QUERY }]
    });
  };

  useEffect(() => {
    if (user) {
      getNotificationsQuery();
      startPolling(60000);
    } else {
      stopPolling();
    }
  }, [user]);

  return {
    notifications: data?.getNotifications || [],
    loading,
    markAsSeen,
    unseenCount
  };
};
