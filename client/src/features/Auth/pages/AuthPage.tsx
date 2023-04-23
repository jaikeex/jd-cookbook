import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { LoginForm, RegisterForm } from '@auth/components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messageSlice';

const AuthPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pageType } = useParams();
  const [searchParams] = useSearchParams();

  const redirected = Boolean(searchParams.get('redirect'));

  if (redirected) {
    dispatch(addMessage({ message: 'Email successfully verified, you can now login!', severity: 'success' }));
  }

  return (
    <Box>
      <Box width="23rem" m="0 auto">
        <Typography variant="h2" sx={{ mb: 6 }}>
          {pageType === 'register' ? 'Welcome!' : 'Welcome back!'}
        </Typography>
        {pageType === 'register' ? <RegisterForm /> : <LoginForm />}
      </Box>
    </Box>
  );
};

export default AuthPage;
