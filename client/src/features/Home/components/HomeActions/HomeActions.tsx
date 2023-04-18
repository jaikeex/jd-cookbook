import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import titleImg from 'assets/title.jpg';
import { SearchForm } from 'features/Home/components/SearchForm';
import { User } from 'core';
import { CButton } from 'components';
import { Link } from 'react-router-dom';

export interface HomeActionsProps {
  user?: User | null;
  onFilterSubmit?: (values: any) => void;
}

export const HomeActions: React.FC<HomeActionsProps> = ({ user, onFilterSubmit }): JSX.Element => {
  const sm = useMediaQuery('(max-width:740px)');

  return (
    <Box
      sx={{
        position: 'relative',
        p: 2,

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
          opacity: 0.3
        }
      }}
    >
      <Typography textAlign="center" variant="h2">
        Welcome!
      </Typography>
      <Box
        sx={{
          maxWidth: '47rem',
          m: '0 auto',
          p: `2rem ${sm ? '0' : '4rem'}`,
          textAlign: 'center'
        }}
      >
        <SearchForm onSubmit={onFilterSubmit} />
        {user?.username && (
          <Box position={sm ? 'relative' : 'absolute'} mt="2rem" bottom={sm ? 0 : 10} right={sm ? 0 : 10}>
            <Link to="/create" style={{ textDecoration: 'none' }} data-testid="home-create-recipe">
              <CButton primary color="success">
                Create new recipe
              </CButton>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};
