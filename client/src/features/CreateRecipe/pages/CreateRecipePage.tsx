import { Delete, AddCircle, EditOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Formik, FieldArray, Form, type FormikHelpers } from 'formik';
import * as React from 'react';
import type { Ingredient } from 'core/types';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE_MUTATION, UPLOAD_FILE_MUTATION } from 'core/graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { CInput } from 'components/CInput';
import { CButton } from 'components';
import { CSelect } from 'components/CSelect';
import { CDropzone } from 'components/CDropzone';

export interface CreateRecipePageProps {}

const validationSchema = yup.object().shape({
  name: yup.string().max(50).required('Name is required'),
  description: yup.string().max(255, 'Description must be at most 255 characters long').notRequired(),
  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Ingredient name is required'),
      amount: yup.string().notRequired()
    })
  ),
  instructions: yup.string().required('Instructions are required'),
  difficulty: yup
    .string()
    .required('Difficulty is required')
    .oneOf(['easy', 'medium', 'hard'], 'Invalid difficulty level'),
  cookingTime: yup.number().required('Cooking time is required').typeError('Must be a number'),
  picturePath: yup.string().notRequired()
});

interface CreateRecipeFormValues {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  picturePath: string;
  cookingTime: number;
}

const initialValues: CreateRecipeFormValues = {
  name: '',
  description: '',
  ingredients: [{ name: '', amount: '' }],
  instructions: '',
  difficulty: 'medium',
  cookingTime: 0,
  picturePath: ''
};

interface UploadFileData {
  uploadFile: string;
}

const CreateRecipePage: React.FC<CreateRecipePageProps> = (props): JSX.Element => {
  const navigate = useNavigate();

  const [triggerCreate, { data: createdRecipe }] = useMutation(CREATE_RECIPE_MUTATION);
  const [triggerUpload, { data: uploadedFile, called }] = useMutation<UploadFileData>(UPLOAD_FILE_MUTATION, {
    context: { useMultipart: true }
  });

  const formSubmitHandler = async (
    values: CreateRecipeFormValues,
    onSubmitProps: FormikHelpers<CreateRecipeFormValues>
  ) => {
    values.cookingTime = +values.cookingTime;
    console.log(values);
    await triggerCreate({
      variables: values,
      onCompleted(data) {
        navigate(`/recipe/${data.createRecipe._id}`);
      }
    });
    onSubmitProps.resetForm();
  };

  return (
    <Box width="60rem" p="2rem" m="2rem auto" borderRadius="1.5rem">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={formSubmitHandler}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              gridTemplateRows="4rem 6rem 1fr"
              gap="2rem"
            >
              <CInput
                name="name"
                label="Name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={(touched.name && errors.name) || ' '}
                sx={{ gridColumn: 'span 2' }}
              />

              <CInput
                name="cookingTime"
                label="Cooking time"
                endAdornment="min"
                inputMode="numeric"
                value={values.cookingTime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cookingTime && Boolean(errors.cookingTime)}
                helperText={(touched.cookingTime && errors.cookingTime) || ' '}
              />
              <CSelect
                id="difficulty"
                name="difficulty"
                label="Difficulty"
                size="medium"
                value={values.difficulty}
                onChange={(event) => setFieldValue('difficulty', event.target.value)}
                error={touched.difficulty && Boolean(errors.difficulty)}
              >
                <MenuItem value={'easy'}>Easy</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'hard'}>Hard</MenuItem>
              </CSelect>
              <CInput
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={(touched.description && errors.description) || ' '}
                sx={{ gridColumn: 'span 4' }}
              />
              <CDropzone
                sx={{ gridColumn: 'span 4' }}
                uploadedFileSrc={uploadedFile?.uploadFile || ''}
                accept={{
                  'image/png': ['.png', '.jpg', '.jpeg']
                }}
                multiple={false}
                onDrop={async (acceptedFiles) => {
                  const [file] = acceptedFiles;
                  const { data } = await triggerUpload({ variables: { file } });
                  setFieldValue('picturePath', data?.uploadFile);
                }}
              />
            </Box>
            <Box marginTop="2rem" display="flex" flexDirection="column" gap="4rem">
              <FieldArray name="ingredients">
                {({ push, remove }) => {
                  return (
                    <Box p="2rem 1rem" border="1px solid green">
                      <Typography variant="h4">Ingredients</Typography>
                      {values.ingredients.map((ingredient, index) => (
                        <Box key={index} display="flex" alignItems="center" gap="2rem" margin="3rem 0">
                          <CInput
                            name={`ingredients.${index}.amount`}
                            label="Amount"
                            size="small"
                            autoComplete="off"
                            value={ingredient.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <CInput
                            name={`ingredients.${index}.name`}
                            label="Name"
                            size="small"
                            autoComplete="off"
                            fullWidth
                            value={ingredient.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.ingredients &&
                              touched.ingredients[index] &&
                              touched.ingredients[index].name &&
                              Boolean(errors.ingredients && errors.ingredients[index])
                            }
                          />
                          <IconButton size="small" onClick={() => remove(index)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                      <Button fullWidth onClick={() => push({ name: '', amount: '' })}>
                        <AddCircle />
                      </Button>
                    </Box>
                  );
                }}
              </FieldArray>

              <CInput
                name="instructions"
                label="Instructions"
                fullWidth
                multiline
                rows={4}
                value={values.instructions}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.instructions && Boolean(errors.instructions)}
                helperText={(touched.instructions && errors.instructions) || ' '}
              />
              <CButton primary fullWidth type="submit">
                Create
              </CButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateRecipePage;
