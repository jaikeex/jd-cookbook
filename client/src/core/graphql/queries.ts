import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
      }
    }
  }
`;

export const LOGOUT_QUERY = gql`
  query logout {
    logout
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
