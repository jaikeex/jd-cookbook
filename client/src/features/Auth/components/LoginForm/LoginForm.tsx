import React, { useCallback } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CButton, CInput, TextLink, PasswordInput } from 'components';
import { useLogin } from '@auth/hooks/useLogin';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('E-mail is required'),
  password: yup.string().required('Password is required')
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

  const handleFormSubmit = useCallback(
    async (values: LoginFormValues, onSubmitProps: FormikHelpers<LoginFormValues>) => {
      if (await login(values.email, values.password)) {
        onSubmitProps.resetForm();
        navigate('/');
      }
    },
    [login, navigate]
  );

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialLoginValues} validationSchema={loginSchema}>
      {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="2rem">
            <CInput
              label="E-mail"
              type="email"
              id="login-form-email"
              data-testid="login-form-email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <PasswordInput
              label="Password"
              id="login-form-password"
              data-testid="login-form-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Box>
              <CButton
                fullWidth
                primary
                data-testid="login-form-button"
                type="submit"
                size="large"
                sx={{
                  mb: 1
                }}
              >
                {loading ? <CircularProgress size={30} /> : 'Login'}
              </CButton>
              <TextLink to={'/auth/register'} data-testid="login-form-register">
                Not registered yet? Create an account!
              </TextLink>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
