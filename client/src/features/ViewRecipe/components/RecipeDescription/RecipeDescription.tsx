import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import * as React from 'react';
import { useRecipeContext } from 'features/ViewRecipe/context';

export interface RecipeDescriptionProps extends TypographyProps {}

const RecipeDescription: React.FC<RecipeDescriptionProps> = (props): JSX.Element => {
  const { recipe } = useRecipeContext();

  return (
    <Typography {...props} variant="body2">
      {recipe.description}
    </Typography>
  );
};

export default RecipeDescription;
