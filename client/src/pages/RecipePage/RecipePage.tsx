import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AccessTimeRounded, OutdoorGrillRounded } from '@mui/icons-material';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';
import { IngredientLabel } from 'components/atoms/IngredientLabel';
import CommentSection from 'components/templates/CommentSection/CommentSection';
import { FlexBetween } from 'components';
import { LIKE_RECIPE_MUTATION, GET_RECIPE_QUERY } from 'core/graphql';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Ingredient, Recipe } from 'core/types';
import placeholder from 'assets/placeholder.png';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { LikeButton } from 'components/molecules/LikeButton';
import { RecipeInfoTag } from 'components/molecules/RecipeInfoTag';

export interface RecipePageProps {}

const RecipePage: React.FC<RecipePageProps> = (): JSX.Element => {
  const [recipe, setRecipe] = useState<Recipe>();
  const params = useParams();
  const { data } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id } });
  const [likeRecipe] = useMutation(LIKE_RECIPE_MUTATION);
  const user = useSelector((state: RootState) => state.auth.user);

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  const handleLikeButtonClick = async () => {
    if (recipe) {
      const { data: updatedRecipe } = await likeRecipe({ variables: { id: recipe._id } });
      setRecipe((prevState) => ({ ...prevState, ...updatedRecipe.likeRecipe }));
    }
  };

  useEffect(() => {
    if (data && data.getRecipe) {
      setRecipe(data.getRecipe);
    }
  }, [data]);

  return (
    <React.Fragment>
      {!!recipe && (
        <React.Fragment>
          <Box
            width={md ? (sm ? '23rem' : '47rem') : '70rem'}
            p="2rem"
            m="2rem auto"
            display={sm ? 'flex' : 'grid'}
            flexDirection="column"
            gridTemplateColumns="repeat(4, 1fr)"
            columnGap="2rem"
          >
            <Box sx={{ gridColumn: 'span 1' }}>
              <img
                style={{
                  maxHeight: '20rem',
                  maxWidth: '20rem',
                  objectFit: 'contain'
                }}
                src={recipe.picturePath || placeholder}
                alt=""
              />
            </Box>

            <Box gridColumn="span 3">
              <FlexBetween>
                <Typography variant="h1">{recipe.name}</Typography>
                <LikeButton
                  defaultChecked={recipe.likedByUser}
                  disabled={!user}
                  onChange={handleLikeButtonClick}
                  label={recipe.likesCount}
                  labelPlacement="start"
                />
              </FlexBetween>

              <Divider />

              <Box display="flex" gap="1rem" mt="0.375rem">
                <RecipeInfoTag icon={<AccessTimeRounded />}>
                  <Typography variant="body2">{recipe.cookingTime} min.</Typography>
                </RecipeInfoTag>

                <RecipeInfoTag icon={<OutdoorGrillRounded />}>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {recipe.difficulty}
                  </Typography>
                </RecipeInfoTag>

                <Box ml="auto" display="flex" gap="1.5rem" flexDirection={md ? 'column' : 'row'}>
                  <Typography component={Link} to="/" variant="caption" color="primary" sx={{ textDecoration: 'none' }}>
                    Author: {recipe.user.username}
                  </Typography>
                  <Typography variant="caption">{new Date(+recipe.createdAt).toLocaleDateString()}</Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mt: '1rem' }}>
                {recipe.description}
              </Typography>
            </Box>
            <Box mt="1rem">
              <List>
                {data &&
                  recipe.ingredients.map((ing: Ingredient, ix: number) => (
                    <IngredientLabel ingredient={ing} key={ix} />
                  ))}
              </List>
            </Box>

            <Box gridColumn="span 3">
              <Typography variant="body2" sx={{ mt: '1rem' }}>
                {recipe.instructions}
              </Typography>
            </Box>

            <Box gridColumn="span 4" mt={6}>
              <Typography gutterBottom>Comments</Typography>
              <CommentSection recipeId={recipe._id} />
            </Box>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RecipePage;
