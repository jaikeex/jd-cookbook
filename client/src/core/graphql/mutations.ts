import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation register($email: String!, $password: String!, $username: String!) {
    register(input: { email: $email, password: $password, username: $username }) {
      username
    }
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation createRecipe(
    $name: String!
    $ingredients: [IngredientInput]!
    $description: String
    $instructions: String
    $picturePath: String
    $cookingTime: Int!
    $difficulty: String!
  ) {
    createRecipe(
      input: {
        name: $name
        ingredients: $ingredients
        description: $description
        instructions: $instructions
        picturePath: $picturePath
        cookingTime: $cookingTime
        difficulty: $difficulty
      }
    ) {
      name
    }
  }
`;

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

export const MARK_NOTIFICATION_AS_SEEN_MUTATION = gql`
  mutation markNotificationAsSeen($id: ID!) {
    markNotificationAsSeen(id: $id) {
      _id
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
