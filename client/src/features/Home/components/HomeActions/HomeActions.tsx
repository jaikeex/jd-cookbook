import React from 'react';
import { Typography } from '@mui/material';
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
  return (
    <Styled.Root component={'section'}>
      <Typography textAlign="center" variant="h2">
        Welcome!
      </Typography>
      <Styled.FormWrapper>
        <SearchForm onSubmit={onFilterSubmit} />
        {user?.username ? (
          <Styled.CreateRecipeButton>
            <Link to="/create" style={{ textDecoration: 'none' }} data-testid="home-create-recipe">
              <CButton primary color="success">
                Create new recipe
              </CButton>
            </Link>
          </Styled.CreateRecipeButton>
        ) : null}
      </Styled.FormWrapper>
    </Styled.Root>
  );
};
