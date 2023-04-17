import { gql } from '@apollo/client';

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
