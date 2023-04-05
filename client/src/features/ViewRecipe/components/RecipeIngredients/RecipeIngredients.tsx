import * as React from 'react';
import { List } from '@mui/material';
import type { ListProps } from '@mui/material';
import type { Ingredient } from 'core';
import { IngredientLabel } from './IngredientLabel';
import { useRecipeContext } from 'features/ViewRecipe/context';

export interface RecipeIngredientsProps extends ListProps {}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = (props): JSX.Element => {
  const { recipe } = useRecipeContext();

  return (
    <List {...props}>
      {recipe.ingredients.map((ing: Ingredient, ix: number) => (
        <IngredientLabel ingredient={ing} key={ix} />
      ))}
    </List>
  );
};

export default RecipeIngredients;
