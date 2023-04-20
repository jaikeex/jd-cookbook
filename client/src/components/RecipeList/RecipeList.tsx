import React from 'react';
import { RecipeCard } from 'components/RecipeCard';
import type { Recipe } from 'types';
import { Waypoint } from 'react-waypoint';

export interface RecipeListProps {
  onScrollToBottom?: () => void;
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, onScrollToBottom }): JSX.Element => {
  return (
    <React.Fragment>
      {recipes.map((recipe, index) => (
        <div key={recipe._id}>
          {index === recipes.length - 2 ? <Waypoint onEnter={onScrollToBottom} /> : null}
          <RecipeCard recipe={recipe} isLink href={`/recipe/${recipe._id}`} />
        </div>
      ))}
    </React.Fragment>
  );
};
