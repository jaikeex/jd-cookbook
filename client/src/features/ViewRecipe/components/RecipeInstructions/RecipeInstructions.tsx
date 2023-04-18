import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { useRecipeContext } from 'features/ViewRecipe/context';
import * as React from 'react';

export interface RecipeInstructionsProps extends TypographyProps {}

const RecipeInstructions: React.FC<RecipeInstructionsProps> = (props): JSX.Element => {
  const { recipe } = useRecipeContext();

  return (
    <Typography {...props} variant="body2" data-testid="recipe-instructions">
      {recipe.instructions}
    </Typography>
  );
};

export default RecipeInstructions;
