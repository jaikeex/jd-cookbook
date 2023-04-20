import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  RecipeComments,
  RecipeHeader,
  RecipeIngredients,
  RecipeInstructions,
  RecipeImage,
  RecipeDescription
} from '@viewRecipe/components';
import { RecipeContextProvider } from '@viewRecipe/context';
import { GET_RECIPE_QUERY, LIKE_RECIPE_MUTATION } from '@viewRecipe/graphql';

const RecipePage: React.FC = () => {
  const params = useParams();

  const { data, loading } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id } });
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION);

  const recipe = data?.getRecipe;

  const handleLikeRecipe = useCallback(async () => {
    if (recipe) {
      likeRecipe({
        variables: { id: recipe._id },
        refetchQueries: [{ query: GET_RECIPE_QUERY, variables: { id: params._id } }]
      });
    }
  }, [likeRecipe, GET_RECIPE_QUERY, params, recipe]);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <RecipeContextProvider recipe={recipe}>
      <Grid container spacing={4}>
        <Grid item sm={3} xs={12}>
          <RecipeImage />
        </Grid>

        <Grid item sm={9} xs={12}>
          <RecipeHeader onLikeRecipe={handleLikeRecipe} />
          <RecipeDescription sx={{ mt: 2 }} />
        </Grid>

        <Grid item sm={3} xs={12}>
          <RecipeIngredients />
        </Grid>

        <Grid item sm={9} xs={12}>
          <RecipeInstructions sx={{ mt: '1rem' }} />
        </Grid>

        <Grid item xs={12} mt={4} component={'section'}>
          <RecipeComments />
        </Grid>
      </Grid>
    </RecipeContextProvider>
  );
};

export default RecipePage;
