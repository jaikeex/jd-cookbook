import { gql } from '@apollo/client';

export const GET_RECIPES_QUERY = gql`
  query getRecipes(
    $query: String
    $userId: ID
    $ingredients: [String]
    $matchAll: Boolean
    $after: String
    $first: Int
  ) {
    getRecipes(
      query: $query
      userId: $userId
      ingredients: $ingredients
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
          createdAt
          likesCount
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

export const SEARCH_RECIPES_QUERY = gql`
  query searchRecipes($userId: ID, $query: String!, $after: String, $first: Int) {
    searchRecipes(query: $query, userId: $userId, after: $after, first: $first) {
      edges {
        node {
          _id
          name
          createdAt
          likesCount
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
