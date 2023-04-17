import { gql } from '@apollo/client';

export const GET_ALL_INGREDIENTS_QUERY = gql`
  query getAllIngredients {
    getAllIngredients {
      name
    }
  }
`;

export const GET_RECIPES_QUERY = gql`
  query getRecipes(
    $query: String
    $ingredients: [String]
    $difficulty: String
    $matchAll: Boolean
    $after: String
    $first: Int
  ) {
    getRecipes(
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
