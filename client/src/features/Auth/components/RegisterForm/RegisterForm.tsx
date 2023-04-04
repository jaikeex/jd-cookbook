import * as React from 'react';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography, useTheme } from '@mui/material';
import { useRegister } from 'core';
import { CButton } from 'components';
import { FormPasswordInput, FormTextInput } from 'features';

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('You must confirm your password')
});

const initialRegisterValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register, loading } = useRegister();

  const formSubmitHandler = async (values: RegisterFormValues, onSubmitProps: FormikHelpers<RegisterFormValues>) => {
    if (await register(values.username, values.email, values.password)) {
      onSubmitProps.resetForm();
      navigate('/login');
    }
  };

  return (
    <Formik onSubmit={formSubmitHandler} initialValues={initialRegisterValues} validationSchema={registerSchema}>
      {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            sx={{
              '& > div': {
                gridColumn: undefined
              }
            }}
          >
            <FormTextInput
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={(touched.username && errors.username) || ' '}
            />
            <FormTextInput
              label="E-mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <FormPasswordInput
              label="Password"
              id="register-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={(touched.password && errors.password) || ' '}
            />
            <FormPasswordInput
              label="Confirm password"
              id="register-confirm-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
              helperText={(touched.confirmPassword && errors.confirmPassword) || ' '}
            />

            <Box>
              <CButton
                fullWidth
                primary
                type="submit"
                size="large"
                sx={{
                  mb: 1
                }}
              >
                {loading ? <CircularProgress /> : 'Register'}
              </CButton>
              <Link to={'/auth/login'}>
                <Typography>Already have an account? Log in!</Typography>
              </Link>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
