import { Box, List, ListItem, useTheme } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { api } from 'store/apiSlice';

export interface RecipePageProps {}

const RecipePage: React.FC<RecipePageProps> = (): JSX.Element => {
  const params = useParams();
  const theme = useTheme();
  const { data } = api.useGetRecipeQuery({ id: params._id || '' });

  return (
    <Box width="60%" m="2rem auto" display="grid" gridTemplateColumns="repeat(2, 1fr)">
      <Box fontSize="16px" border={`1px solid ${theme.palette.success.main}`}>
        <List>
          {data?.ingredients.map((ing, ix) => (
            <ListItem dense key={ix}>{`${ing.amount || ''} ${ing.name}`}</ListItem>
          ))}
        </List>
      </Box>
      <Box> </Box>
    </Box>
  );
};

export default RecipePage;
