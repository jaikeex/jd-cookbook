import { useQuery } from '@apollo/client';
import type { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { GET_RECIPES_QUERY } from 'core';
import { useEffect, useState } from 'react';
import type { Recipe } from 'core';

interface GetRecipesQueryData {
  getRecipes: {
    edges: {
      node: Recipe;
      cursor: string;
    };
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

interface IUseRecipePagination {
  recipes: Recipe[];
  refetchRecipes: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetRecipesQueryData>>;
  fetchMoreRecipes: (variables?: Partial<OperationVariables> | undefined) => void;
  loading: boolean;
  hasNextPage: boolean;
}

export const useRecipePagination = (): IUseRecipePagination => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const { data, refetch, fetchMore, loading } = useQuery(GET_RECIPES_QUERY, { refetchWritePolicy: 'overwrite' });

  const fetchMoreRecipes = (variables?: Partial<OperationVariables>) => {
    const { endCursor } = data.getRecipes.pageInfo;
    hasNextPage &&
      fetchMore({
        variables: { after: endCursor, ...variables },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prevResult;
          }

          fetchMoreResult.getRecipes.edges = [...prevResult.getRecipes.edges, ...fetchMoreResult.getRecipes.edges];
          return fetchMoreResult;
        }
      });
  };

  useEffect(() => {
    if (data) {
      setRecipes(data.getRecipes.edges.map(({ node }: { node: Recipe; }) => node));
      setHasNextPage(data.getRecipes.pageInfo.hasNextPage);
    }
  }, [data]);

  return {
    recipes,
    refetchRecipes: refetch,
    fetchMoreRecipes,
    loading,
    hasNextPage
  };
};
