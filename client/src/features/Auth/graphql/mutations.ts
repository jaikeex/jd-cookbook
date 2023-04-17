import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation register($email: String!, $password: String!, $username: String!) {
    register(input: { email: $email, password: $password, username: $username }) {
      username
    }
  }
`;
