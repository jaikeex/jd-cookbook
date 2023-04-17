import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
  useMutation
} from '@apollo/client';
import { Recipe } from 'core';
import { UPDATE_RECIPE_MUTATION } from 'features/CreateRecipe/graphql';

interface UpdateRecipeResponse {
  updateRecipe: Recipe;
}

interface IUseUpdateRecipe {
  updateRecipe: (
    options?:
      | MutationFunctionOptions<UpdateRecipeResponse, OperationVariables, DefaultContext, ApolloCache<any>>
      | undefined
  ) => Promise<FetchResult<UpdateRecipeResponse>>;
  data?: UpdateRecipeResponse | null;
  loading: boolean;
}

export const useUpdateRecipe = (): IUseUpdateRecipe => {
  const [updateRecipe, { data, loading }] = useMutation<UpdateRecipeResponse>(UPDATE_RECIPE_MUTATION);

  return { updateRecipe, data, loading };
};
