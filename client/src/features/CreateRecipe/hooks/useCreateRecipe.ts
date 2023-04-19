import type {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client';
import { useMutation } from '@apollo/client';
import type { Recipe } from 'types';
import { CREATE_RECIPE_MUTATION } from '@createRecipe/graphql';

interface CreateRecipeResponse {
  createRecipe: Recipe;
}

interface IUseCreateRecipe {
  createRecipe: (
    options?:
      | MutationFunctionOptions<CreateRecipeResponse, OperationVariables, DefaultContext, ApolloCache<any>>
      | undefined
  ) => Promise<FetchResult<CreateRecipeResponse>>;
  data?: CreateRecipeResponse | null;
  loading: boolean;
}

export const useCreateRecipe = (): IUseCreateRecipe => {
  const [createRecipe, { data, loading }] = useMutation<CreateRecipeResponse>(CREATE_RECIPE_MUTATION);

  return { createRecipe, data, loading };
};
