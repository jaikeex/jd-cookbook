import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications {
    getNotifications {
      _id
      recipe
      seen
      text
    }
  }
`;

export const LOGOUT_QUERY = gql`
  query logout {
    logout
  }
`;
