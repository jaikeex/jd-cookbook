import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      username
      email
      createdAt
    }
  }
`;

export const GET_RECIPES_QUERY = gql`
  query getRecipes(
    $userId: ID
    $query: String
    $ingredients: [String]
    $difficulty: String
    $matchAll: Boolean
    $after: String
    $first: Int
  ) {
    getRecipes(
      userId: $userId
      query: $query
      ingredients: $ingredients
      difficulty: $difficulty
      matchAll: $matchAll
      after: $after
      first: $first
    ) {
      edges {
        node {
          _id
          name
          picturePath
          description
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
