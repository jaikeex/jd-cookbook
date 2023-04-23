import React, { useCallback } from 'react';
import * as yup from 'yup';
import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CButton, CInput, TextLink, PasswordInput } from 'components';
import { useRegister } from '@auth/hooks/useRegister';

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('E-mail is required'),
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
  const navigate = useNavigate();
  const { register, loading } = useRegister();

  const formSubmitHandler = useCallback(
    async (values: RegisterFormValues, onSubmitProps: FormikHelpers<RegisterFormValues>) => {
      if (await register(values.username, values.email, values.password)) {
        onSubmitProps.resetForm();
        navigate('/auth/login');
      }
    },
    [register, navigate]
  );

  return (
    <Formik onSubmit={formSubmitHandler} initialValues={initialRegisterValues} validationSchema={registerSchema}>
      {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
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
            <CInput
              label="Username"
              data-testid="register-form-username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={(touched.username && errors.username) || ' '}
            />
            <CInput
              label="E-mail"
              data-testid="register-form-email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={(touched.email && errors.email) || ' '}
            />
            <PasswordInput
              label="Password"
              data-testid="register-form-password"
              id="register-password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={(touched.password && errors.password) || ' '}
            />
            <PasswordInput
              label="Confirm password"
              data-testid="register-form-confirm-password"
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
                data-testid="register-form-button"
                type="submit"
                size="large"
                sx={{
                  mb: 1
                }}
              >
                {loading ? <CircularProgress /> : 'Register'}
              </CButton>
              <TextLink to="/auth/login" data-testid="register-form-link">
                Already have an account? Log in!
              </TextLink>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
