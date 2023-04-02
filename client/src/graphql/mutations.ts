import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation register($email: String!, $password: String!, $username: String!, $avatar: Upload!) {
    register(input: { email: $email, password: $password, username: $username, avatar: $avatar }) {
      username
      avatar
    }
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
