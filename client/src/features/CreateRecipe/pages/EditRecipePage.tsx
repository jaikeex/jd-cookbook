import React from 'react';
import { RecipeForm } from 'features/CreateRecipe/components';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE_QUERY } from 'features/CreateRecipe/graphql';
import { useUpdateRecipe } from 'features/CreateRecipe/hooks/useUpdateRecipe';
import { Recipe } from 'core';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

export interface EditRecipePageProps {}

export const EditRecipePage: React.FC<EditRecipePageProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { updateRecipe } = useUpdateRecipe();

  const { data: recipe } = useQuery(GET_RECIPE_QUERY, { variables: { id: params._id } });

  const handleFormSubmit = async (values: Partial<Recipe>) => {
    await updateRecipe({
      variables: { id: params._id, ...values },
      onCompleted(data) {
        dispatch(addMessage({ message: 'Update successful!', severity: 'success' }));
        navigate(`/recipe/${data?.updateRecipe._id}`);
      }
    });
  };

  return <Box>{recipe?.getRecipe && <RecipeForm onSubmit={handleFormSubmit} recipe={recipe?.getRecipe} />}</Box>;
};
