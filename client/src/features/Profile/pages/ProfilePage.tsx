import { useRecipePagination } from 'core';
import { GET_RECIPES_QUERY, GET_USER_QUERY } from 'features/Profile/graphql';
import RecipeTable from 'features/Profile/components/RecipeTable/RecipeTable';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from 'store';
import { RecipeList } from 'components/RecipeList';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from '@apollo/client';

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = (props): JSX.Element => {
  const params = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const { recipes, refetchRecipes, fetchMoreRecipes, loading } = useRecipePagination(GET_RECIPES_QUERY, {
    userId: params._id
  });

  const { data, loading: loadingUser } = useQuery(GET_USER_QUERY, { variables: { id: params._id } });

  const isOwnProfile = user?._id === params._id;

  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  const getAccountAge = (date: Date) => {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
    return Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  };

  return (
    <React.Fragment>
      <Box>
        {loadingUser && <CircularProgress />}
        {data && (
          <Box>
            <Typography variant="h2" mb={2}>{`${isOwnProfile ? 'User Profile:' : 'Recipes by'} ${
              data.getUserById.username
            }`}</Typography>
            {isOwnProfile && (
              <Box>
                <Typography mb={1}>{`E-mail: ${data.getUserById.email}`}</Typography>
                <Typography>{`Account age: ${getAccountAge(new Date(+data.getUserById.createdAt))} days`}</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box display="grid" gridTemplateColumns={`repeat(${md ? (sm ? '1' : '2') : '3'}, 1fr)`} gap="3rem" mt="3rem">
        {isOwnProfile ? (
          <React.Fragment>
            <Typography variant="h3" gridColumn="span 3">
              Your recipes:
            </Typography>
            <RecipeTable userId={params._id || ''} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RecipeList recipes={recipes} onScrollToBottom={() => fetchMoreRecipes()} />
            {loading && <CircularProgress />}
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ProfilePage;
