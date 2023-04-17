import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  useMutation
} from '@apollo/client';
import { Recipe } from 'core';
import { CREATE_RECIPE_MUTATION } from 'features/CreateRecipe/graphql';

interface CreateRecipeResponse {
  createRecipe: Recipe;
}

interface IUseCreateRecipe {
  createRecipe: (
    options?:
      | MutationFunctionOptions<CreateRecipeResponse, OperationVariables, DefaultContext, ApolloCache<any>>
      | undefined
  ) => Promise<FetchResult<CreateRecipeResponse>>;
  createdRecipe?: Recipe | null;
  loading: boolean;
}

export const useCreateRecipe = (): IUseCreateRecipe => {
  const [createRecipe, { data, loading }] = useMutation<CreateRecipeResponse>(CREATE_RECIPE_MUTATION);

  return { createRecipe, createdRecipe: data?.createRecipe, loading };
};
