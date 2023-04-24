import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeForm } from '@createRecipe/components';
import { useCreateRecipe } from '@createRecipe/hooks';
import type { Recipe } from 'types';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

export const CreateRecipePage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createRecipe, client } = useCreateRecipe();

  const handleFormSubmit = useCallback(
    async (values: Partial<Recipe>) => {
      await createRecipe({
        variables: values,
        async onCompleted(data) {
          dispatch(addMessage({ message: `Recipe ${values.name} successfully created!`, severity: 'success' }));
          await client.clearStore();
          navigate(`/recipe/${data?.createRecipe._id}`);
        }
      });
    },
    [createRecipe, dispatch, addMessage, navigate]
  );

  return (
    <Box>
      <RecipeForm onSubmit={handleFormSubmit} />
    </Box>
  );
};
