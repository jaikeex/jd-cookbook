import * as React from 'react';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import { gqlRequest } from 'utils/gqlRequest';

const registerSchema = yup.object().shape({
  username: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  avatar: yup.string().optional()
});

const initialRegisterValues = {
  username: '',
  email: '',
  password: '',
  avatar: ''
};

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = (props): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();

  const register = async (values: RegisterFormValues, onSubmitProps: FormikHelpers<RegisterFormValues>) => {
    const savedUserResponse = await gqlRequest(`
    mutation {
      register(email: "${values.email}", 
      username: "${values.username}", 
      password: "${values.password}", 
      avatar: "${values.avatar}") {
        _id
        }
      }
    `);

    onSubmitProps.resetForm();
    if (savedUserResponse) {
      navigate('/login');
    }
  };

  const formSubmitHandler = async (values: RegisterFormValues, onSubmitProps: FormikHelpers<RegisterFormValues>) => {
    register(values, onSubmitProps);
  };

  return (
    <Formik onSubmit={formSubmitHandler} initialValues={initialRegisterValues} validationSchema={registerSchema}>
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
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              label="E-mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Box gridColumn="span 4" border={`1px solid ${theme.palette.primary.main}`} borderRadius="5px" p="1rem">
              <Dropzone
                accept={{
                  'image/png': ['.png', '.jpg', '.jpeg']
                }}
                multiple={false}
                onDrop={(acceptedFiles) => setFieldValue('avatar', acceptedFiles[0].name)}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${theme.palette.primary.main}`}
                    p="1rem"
                    sx={{
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <input {...getInputProps()} />
                    {!values.avatar ? (
                      <p>Upload your profile picture (optional)</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.avatar}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
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
                <Typography>Register</Typography>
              </Button>
              <Link to={'/login'}>
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
