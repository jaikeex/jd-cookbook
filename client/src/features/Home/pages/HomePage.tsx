import * as React from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import type { RootState } from 'store/index';
import { useSelector } from 'react-redux';
import { useRecipePagination } from 'features/Home/hooks/useRecipePagination';
import { HomeActions } from 'features/Home/components/HomeActions';
import { RecipeList } from 'components/RecipeList';

const HomePage: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { recipes, refetchRecipes, fetchMoreRecipes, loading } = useRecipePagination();

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  const filterRecipesHandler = (values: any) => {
    refetchRecipes({
      ingredients: values.ingredients,
      matchAll: true,
      query: values.query,
      difficulty: values.difficulty === 'all' ? '' : values.difficulty
    });
  };

  return (
    <React.Fragment>
      <HomeActions user={user} onFilterSubmit={filterRecipesHandler} />

      <Box
        borderRadius="1.5rem"
        display="grid"
        gridTemplateColumns={`repeat(${md ? (sm ? '1' : '2') : '3'}, 1fr)`}
        gap="3rem"
        mt="3rem"
      >
        <RecipeList recipes={recipes} onScrollToBottom={() => fetchMoreRecipes()} />
        {loading && <CircularProgress />}
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
