import * as React from 'react';
import titleImg from 'assets/title.jpg';
import { useEffect, useState } from 'react';
import type { Recipe } from 'types';
import { gqlRequest } from 'utils/gqlRequest';
import RecipeCard from 'components/RecipeCard/RecipeCard';
import { useGetAllRecipesQuery } from 'store/apiSlice';

export interface TitlePageProps {}

const TitlePage: React.FC<TitlePageProps> = (props): JSX.Element => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, isLoading, isFetching } = useGetAllRecipesQuery(null);

  useEffect(() => {
    data && setRecipes(data);
  }, [data]);

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.name} />
      ))}
    </div>
  );
};

export default TitlePage;
