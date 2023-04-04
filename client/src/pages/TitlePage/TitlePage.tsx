import * as React from 'react';
import titleImg from 'assets/title.jpg';
import { useEffect, useState } from 'react';
import type { Recipe } from 'core/types';
import RecipeCard from 'components/molecules/RecipeCard/RecipeCard';
import { Box, Button, CircularProgress, useMediaQuery } from '@mui/material';
import AsyncMultiSelect from 'components/AsyncMultiSelect/AsyncMultiSelect';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_RECIPES_QUERY } from 'core/graphql/queries';
import { Waypoint } from 'react-waypoint';
import { Link } from 'react-router-dom';
import type { RootState } from 'store/index';
import { useDispatch, useSelector } from 'react-redux';

export interface TitlePageProps {}

interface OptionType {
  label: string;
  value: string;
}

const TitlePage: React.FC<TitlePageProps> = (props): JSX.Element => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.auth.user);

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  const { data, refetch, fetchMore, networkStatus } = useQuery(GET_RECIPES_QUERY, {
    notifyOnNetworkStatusChange: true
  });

  const filterRecipesHandler = () => {
    refetch({ ingredients: selectedOptions.map((option) => option.value), matchAll: true });
  };

  useEffect(() => {
    if (data) {
      /* @ts-ignore */
      setRecipes(data.getRecipes.edges.map(({ node }) => node));
      setHasNextPage(data.getRecipes.pageInfo.hasNextPage);
    }
  }, [data]);

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
          <AsyncMultiSelect onChange={(options) => setSelectedOptions(options)} />
          <Button onClick={filterRecipesHandler} variant="contained" sx={{ mt: '1rem', width: '8rem' }}>
            Filter
          </Button>
          {user?.username && (
            <Link to="/create">
              <Button
                size="small"
                color="success"
                variant="contained"
                sx={{ mt: '1rem', width: 'max-content', position: 'absolute', bottom: 10, right: 10 }}
              >
                Create new recipe
              </Button>
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
            {index === recipes.length - 2 && (
              <Waypoint
                onEnter={() => {
                  const { endCursor } = data.getRecipes.pageInfo;
                  hasNextPage &&
                    fetchMore({
                      variables: { after: endCursor },
                      updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                          return prevResult;
                        }

                        fetchMoreResult.getRecipes.edges = [
                          ...prevResult.getRecipes.edges,
                          ...fetchMoreResult.getRecipes.edges
                        ];
                        return fetchMoreResult;
                      }
                    });
                }}
              />
            )}
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {networkStatus === 3 && <CircularProgress />}
      </Box>
    </React.Fragment>
  );
};

export default TitlePage;
