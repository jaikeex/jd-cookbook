import { gql } from '@apollo/client';

export const LIKE_RECIPE_MUTATION = gql`
  mutation likeRecipe($id: ID!) {
    likeRecipe(id: $id) {
      likesCount
    }
  }
`;
