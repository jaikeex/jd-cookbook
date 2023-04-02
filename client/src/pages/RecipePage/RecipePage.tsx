import { useMutation, useQuery } from '@apollo/client';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, List, ListItem, Typography, useTheme } from '@mui/material';
import CommentSection from 'components/CommentSection/CommentSection';
import { LIKE_RECIPE_MUTATION } from 'graphql/mutations';
import { GET_RECIPE_QUERY } from 'graphql/queries';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from 'store/apiSlice';
import type { Ingredient, Recipe } from 'types';

export interface RecipePageProps {}

const RecipePage: React.FC<RecipePageProps> = (): JSX.Element => {
  const [recipe, setRecipe] = useState<Recipe>();
  const params = useParams();
  const theme = useTheme();
  const { data } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id } });
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION);

  useEffect(() => {
    if (data && data.getRecipe) {
      setRecipe(data.getRecipe);
    }
  }, [data]);

  return (
    <React.Fragment>
      {!!recipe && (
        <React.Fragment>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={recipe.likedByUser}
                onChange={async () => {
                  const { data: updatedRecipe } = await likeRecipe({ variables: { id: recipe._id } });
                  setRecipe((prevState) => ({ ...prevState, ...updatedRecipe.likeRecipe }));
                }}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="error" />}
              />
            }
            label={recipe.likesCount}
          />
          <Box width="60%" m="2rem auto" display="grid">
            <Typography>{recipe.name}</Typography>
            <Typography>{recipe.description}</Typography>
            <Box fontSize="16px" border={`1px solid ${theme.palette.success.main}`}>
              <List>
                {data &&
                  recipe.ingredients.map((ing: Ingredient, ix: number) => (
                    <ListItem dense key={ix}>{`${ing.amount || ''} ${ing.name}`}</ListItem>
                  ))}
              </List>
            </Box>
            <Box> </Box>
          </Box>
          <CommentSection recipeId={recipe._id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RecipePage;
