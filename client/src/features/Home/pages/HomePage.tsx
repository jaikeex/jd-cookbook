import * as React from 'react';
import titleImg from 'assets/title.jpg';
import { useState } from 'react';
import RecipeCard from 'features/Home/components/RecipeCard/RecipeCard';
import { Box, CircularProgress, TextField, useMediaQuery, alpha, useTheme } from '@mui/material';
import AsyncMultiSelect from 'features/Home/components/AsyncMultiSelect/AsyncMultiSelect';
import { Waypoint } from 'react-waypoint';
import { Link } from 'react-router-dom';
import type { RootState } from 'store/index';
import { useSelector } from 'react-redux';
import { CButton } from 'components';
import { useRecipePagination } from 'core';
import { SearchForm } from 'features';

export interface HomePageProps {}

interface OptionType {
  label: string;
  value: string;
}

const HomePage: React.FC<HomePageProps> = (props): JSX.Element => {
  const { recipes, refetchRecipes, fetchMoreRecipes, loading } = useRecipePagination();
  const user = useSelector((state: RootState) => state.auth.user);
  const [filterText, setFilterText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');
  const theme = useTheme();

  const filterRecipesHandler = (values: any) => {
    console.log(values);
    refetchRecipes({
      ingredients: selectedOptions.map((option) => option.value),
      matchAll: true,
      query: values.query,
      difficulty: values.difficulty === 'all' ? '' : values.difficulty
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'relative',

          '&::before': {
            content: '""',
            background: `url(${titleImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            opacity: 0.5
          }
        }}
      >
        <Box
          sx={{
            maxWidth: '47rem',
            m: '0 auto',
            p: `4rem ${sm ? '0' : '4rem'}`,
            textAlign: 'center'
          }}
        >
          <SearchForm onSubmit={filterRecipesHandler} />
          {user?.username && (
            <Link to="/create">
              <CButton primary color="success" sx={{ mt: '1rem', position: 'absolute', bottom: 10, right: 10 }}>
                Create new recipe
              </CButton>
            </Link>
          )}
        </Box>
      </Box>

      <Box
        borderRadius="1.5rem"
        display="grid"
        gridTemplateColumns={`repeat(${md ? (sm ? '1' : '2') : '3'}, 1fr)`}
        gap="3rem"
        mt="3rem"
      >
        {recipes.map((recipe, index) => (
          <div key={recipe._id}>
            {index === recipes.length - 2 && <Waypoint onEnter={() => fetchMoreRecipes()} />}
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {loading && <CircularProgress />}
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
