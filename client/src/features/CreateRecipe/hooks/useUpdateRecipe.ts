import type {
  ApolloCache,
  ApolloClient,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client';
import { useMutation } from '@apollo/client';
import type { Recipe } from 'types';
import { UPDATE_RECIPE_MUTATION } from '@createRecipe/graphql';

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
  client: ApolloClient<any>;
}

export const useUpdateRecipe = (): IUseUpdateRecipe => {
  const [updateRecipe, { data, loading, client }] = useMutation<UpdateRecipeResponse>(UPDATE_RECIPE_MUTATION);

  return { updateRecipe, data, loading, client };
};
