import * as React from 'react';
import type { Recipe } from 'types';

export interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }): JSX.Element => {
  console.log(recipe);

  return <div />;
};

export default RecipeCard;
