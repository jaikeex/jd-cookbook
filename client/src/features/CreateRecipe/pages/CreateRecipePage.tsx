import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeForm } from 'features/CreateRecipe/components/CreateRecipeForm';
import { Recipe } from 'core';
import { useCreateRecipe } from 'features/CreateRecipe/hooks/useCreateRecipe';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

export interface CreateRecipePageProps {}

const CreateRecipePage: React.FC<CreateRecipePageProps> = (props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createRecipe } = useCreateRecipe();

  const handleFormSubmit = async (values: Partial<Recipe>) => {
    await createRecipe({
      variables: values,
      onCompleted(data) {
        dispatch(addMessage({ message: `Recipe ${values.name} successfully created!`, severity: 'success' }));
        navigate(`/recipe/${data?.createRecipe._id}`);
      }
    });
  };

  return (
    <Box>
      <RecipeForm onSubmit={handleFormSubmit} />
    </Box>
  );
};

export default CreateRecipePage;
