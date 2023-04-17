import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreateRecipeForm } from 'features/CreateRecipe/components/CreateRecipeForm';

export interface CreateRecipePageProps {}

const CreateRecipePage: React.FC<CreateRecipePageProps> = (props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box width="60rem" p="2rem" m="2rem auto" borderRadius="1.5rem">
      <CreateRecipeForm onSuccess={(recipe) => navigate(`/recipe/${recipe._id}`)} />
    </Box>
  );
};

export default CreateRecipePage;
