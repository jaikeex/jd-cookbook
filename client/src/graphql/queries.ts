import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
      }
    }
  }
`;

export const GET_RECIPE_QUERY = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      _id
      createdAt
      user {
        username
      }
      name
      likedByUser
      likesCount
      description
      instructions
      picturePath
      difficulty
      cookingTime
      ingredients {
        name
        amount
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query getComments($id: ID!) {
    getComments(id: $id) {
      user {
        username
      }
      text
      createdAt
    }
  }
`;
