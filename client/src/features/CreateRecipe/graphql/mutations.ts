import { gql } from '@apollo/client';

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
      _id
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation updateRecipe(
    $id: ID!
    $name: String!
    $ingredients: [IngredientInput]!
    $description: String
    $instructions: String
    $picturePath: String
    $cookingTime: Int!
    $difficulty: String!
  ) {
    updateRecipe(
      id: $id
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
      _id
    }
  }
`;
