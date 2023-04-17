import { gql } from '@apollo/client';

export const GET_RECIPE_QUERY = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      _id
      name
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
