import { gql } from '@apollo/client';

export const GET_RECIPE_QUERY = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      _id
      createdAt
      user {
        username
        _id
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
        unit
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query getComments($id: ID!) {
    getComments(id: $id) {
      user {
        _id
        username
      }
      text
      createdAt
    }
  }
`;
