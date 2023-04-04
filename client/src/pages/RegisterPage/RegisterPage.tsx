import * as React from 'react';
import { Box, Typography } from '@mui/material';
import RegisterForm from 'components/templates/RegisterForm';

const RegisterPage: React.FC = (): JSX.Element => {
  return (
    <Box>
      <Box width="30rem" p={4} m="2rem auto">
        <Typography variant="h2" sx={{ mb: 6 }}>
          Welcome!
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterPage;
