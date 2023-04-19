import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import titleImg from 'assets/title.jpg';
import { SearchForm } from 'features/Home/components/SearchForm';
import type { User } from 'types';
import { CButton } from 'components';
import { Link } from 'react-router-dom';
import * as Styled from './styles';

export interface HomeActionsProps {
  user?: User | null;
  onFilterSubmit?: (values: any) => void;
}

export const HomeActions: React.FC<HomeActionsProps> = ({ user, onFilterSubmit }): JSX.Element => {
  const sm = useMediaQuery('(max-width:740px)');

  return (
    <Styled.Root>
      <Typography textAlign="center" variant="h2">
        Welcome!
      </Typography>
      <Styled.FormWrapper>
        <SearchForm onSubmit={onFilterSubmit} />
        {user?.username && (
          <Styled.CreateRecipeButton>
            <Link to="/create" style={{ textDecoration: 'none' }} data-testid="home-create-recipe">
              <CButton primary color="success">
                Create new recipe
              </CButton>
            </Link>
          </Styled.CreateRecipeButton>
        )}
      </Styled.FormWrapper>
    </Styled.Root>
  );
};
