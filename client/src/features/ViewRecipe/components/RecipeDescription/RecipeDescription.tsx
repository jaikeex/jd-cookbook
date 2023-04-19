import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { useRecipeContext } from '@viewRecipe/context';

export interface RecipeDescriptionProps extends TypographyProps {}

const RecipeDescription: React.FC<RecipeDescriptionProps> = (props): JSX.Element => {
  const { recipe } = useRecipeContext();

  return (
    <Typography {...props} variant="body2" data-testid="recipe-description">
      {recipe.description}
    </Typography>
  );
};

export default RecipeDescription;
