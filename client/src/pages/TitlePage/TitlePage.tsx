import * as React from 'react';
import titleImg from 'assets/title.jpg';
import { useEffect, useState } from 'react';
import type { Recipe } from 'types';
import { gqlRequest } from 'utils/gqlRequest';
import RecipeCard from 'components/RecipeCard/RecipeCard';
import { useGetAllRecipesQuery } from 'store/apiSlice';
import { Box } from '@mui/material';

export interface TitlePageProps {}

const TitlePage: React.FC<TitlePageProps> = (props): JSX.Element => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, isLoading, isFetching } = useGetAllRecipesQuery(null);

  useEffect(() => {
    data && setRecipes(data);
  }, [data]);

  return (
    <div>
      <Box
        width="60%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="3rem"
      >
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.name} />
        ))}
      </Box>
    </div>
  );
};

export default TitlePage;
