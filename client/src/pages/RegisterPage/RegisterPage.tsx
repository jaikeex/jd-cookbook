import * as React from 'react';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import RegisterForm from 'templates/RegisterForm';

export interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Box width="100%" bgcolor={theme.palette.background.default} p="1rem" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Cookbook
        </Typography>
      </Box>

      <Box width={'30rem'} p="2rem" m="2rem auto" borderRadius="1.5rem" bgcolor={theme.palette.background.default}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome!
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterPage;
