import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { LoginForm, RegisterForm } from '@auth/components';
import { useParams } from 'react-router-dom';

const AuthPage: React.FC = (): JSX.Element => {
  const { pageType } = useParams();

  return (
    <Box>
      <Box width="23rem" m="0 auto">
        <Typography variant="h2" sx={{ mb: 6 }}>
          Welcome!
        </Typography>
        {pageType === 'register' ? <RegisterForm /> : <LoginForm />}
      </Box>
    </Box>
  );
};

export default AuthPage;
