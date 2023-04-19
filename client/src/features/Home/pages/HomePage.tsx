import React, { useCallback } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import type { RootState } from 'store/index';
import { useSelector } from 'react-redux';
import { HomeActions } from '@home/components';
import { RecipeList } from 'components';
import { GET_RECIPES_QUERY } from '@home/graphql';
import { useRecipePagination } from 'hooks';
import * as Styled from './styles';

const HomePage: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { recipes, refetchRecipes, fetchMoreRecipes, loading } = useRecipePagination(GET_RECIPES_QUERY);

  const handleFilterRecipes = useCallback(
    (values: any) => {
      refetchRecipes({
        ingredients: values.ingredients,
        matchAll: true,
        query: values.query,
        difficulty: values.difficulty === 'all' ? '' : values.difficulty
      });
    },
    [refetchRecipes]
  );

  const handleScrollToBottom = useCallback(() => {
    fetchMoreRecipes();
  }, [fetchMoreRecipes]);

  return (
    <React.Fragment>
      <HomeActions user={user} onFilterSubmit={handleFilterRecipes} />

      <Styled.Recipes>
        <RecipeList recipes={recipes} onScrollToBottom={handleScrollToBottom} />
        {loading && <CircularProgress />}
      </Styled.Recipes>
    </React.Fragment>
  );
};

export default HomePage;
