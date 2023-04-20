import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { RecipeForm } from '@createRecipe/components';
import { GET_RECIPE_QUERY } from '@createRecipe/graphql';
import { useUpdateRecipe } from '@createRecipe/hooks';
import type { Recipe } from 'types';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

export const EditRecipePage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { updateRecipe } = useUpdateRecipe();

  const { data: recipe } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id }, fetchPolicy: 'no-cache' });

  const handleFormSubmit = useCallback(
    async (values: Partial<Recipe>) => {
      await updateRecipe({
        variables: { id: params._id, ...values },
        onCompleted(data) {
          dispatch(addMessage({ message: 'Update successful!', severity: 'success' }));
          navigate(`/recipe/${data?.updateRecipe._id}`);
        }
      });
    },
    [updateRecipe, dispatch, addMessage, navigate]
  );

  return <Box>{recipe?.getRecipe && <RecipeForm onSubmit={handleFormSubmit} recipe={recipe?.getRecipe} />}</Box>;
};
