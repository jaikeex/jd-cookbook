import { gql } from '@apollo/client';

export const MARK_NOTIFICATION_AS_SEEN_MUTATION = gql`
  mutation markNotificationAsSeen($id: ID!) {
    markNotificationAsSeen(id: $id) {
      _id
    }
  }
`;
