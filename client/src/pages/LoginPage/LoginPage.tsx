import * as React from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from 'components/templates/LoginForm';

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <Box>
      <Box width="30rem" p={4} m="2rem auto">
        <Typography variant="h2" sx={{ mb: 6 }}>
          Welcome!
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
