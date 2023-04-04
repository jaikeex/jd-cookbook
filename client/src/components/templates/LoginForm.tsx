import { Formik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from '@mui/material';
import type { FormikHelpers } from 'formik';
import { useLogin } from 'core';

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required')
});

const initialLoginValues = {
  email: '',
  password: ''
};

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = (): JSX.Element => {
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const theme = useTheme();

  const handleFormSubmit = async (values: LoginFormValues, onSubmitProps: FormikHelpers<LoginFormValues>) => {
    if (await login(values.email, values.password)) {
      onSubmitProps.resetForm();
      navigate('/');
    }
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialLoginValues} validationSchema={loginSchema}>
      {({ values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            gap="2rem"
            sx={{
              '& > div': {
                gridColumn: undefined
              }
            }}
          >
            <TextField
              label="E-mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={(touched.password && errors.password) || ' '}
            />
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                {loading ? <CircularProgress /> : 'Login'}
              </Button>
              <Link to={'/register'}>
                <Typography>Not registered yet? Create an account!</Typography>
              </Link>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
