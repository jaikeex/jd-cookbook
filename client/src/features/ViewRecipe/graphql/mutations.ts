import { gql } from '@apollo/client';

export const LIKE_RECIPE_MUTATION = gql`
  mutation likeRecipe($id: ID!) {
    likeRecipe(id: $id) {
      likesCount
    }
  }
`;

export const COMMENT_RECIPE_MUTATION = gql`
  mutation commentRecipe($id: ID!, $text: String!) {
    commentRecipe(input: { id: $id, text: $text }) {
      user {
        username
      }
      text
      createdAt
    }
  }
`;
