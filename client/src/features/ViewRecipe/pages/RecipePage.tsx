import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LIKE_RECIPE_MUTATION, GET_RECIPE_QUERY } from 'core/graphql';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { RecipeComments, RecipeHeader, RecipeIngredients, RecipeInstructions } from 'features';
import { RecipeContextProvider } from 'features/ViewRecipe/context';
import { RecipeImage } from 'features';
import { RecipeDescription } from 'features';

export interface RecipePageProps {}

const RecipePage: React.FC<RecipePageProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const params = useParams();

  const md = useMediaQuery('(max-width:1200px)');

  const { data } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id } });
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION);

  const handleLikeRecipe = async () => {
    if (recipe) {
      likeRecipe({
        variables: { id: recipe._id },
        refetchQueries: [{ query: GET_RECIPE_QUERY, variables: { id: params._id } }]
      });
    }
  };

  const recipe = data?.getRecipe;

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

        <Grid item xs={12} mt={4}>
          <RecipeComments />
        </Grid>
      </Grid>
    </RecipeContextProvider>
  );
};

export default RecipePage;
