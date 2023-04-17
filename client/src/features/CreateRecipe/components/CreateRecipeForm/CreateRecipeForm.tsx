import React from 'react';
import * as yup from 'yup';
import type { Ingredient, Recipe } from 'core/types';
import { useFileUpload } from 'core/hooks/useFileUpload';
import { Form, FieldArray, Formik, FormikHelpers } from 'formik';
import { useCreateRecipe } from 'features/CreateRecipe/hooks/useCreateRecipe';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem } from '@mui/material';
import { CButton } from 'components';
import { CDropzone } from 'components/CDropzone';
import { CInput } from 'components/CInput';
import { CSelect } from 'components/CSelect';
import { IngredientsInputArray } from 'features/CreateRecipe/components/IngredientsInputArray';

export interface CreateRecipeFormProps {
  onSuccess: (createdRecipe: Recipe) => void;
}

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

export const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({ onSuccess }): JSX.Element => {
  const navigate = useNavigate();

  const { uploadFile, uploadedFile, loading } = useFileUpload();
  const { createRecipe, createdRecipe } = useCreateRecipe();

  const handleFormSubmit = async (
    values: CreateRecipeFormValues,
    onSubmitProps: FormikHelpers<CreateRecipeFormValues>
  ) => {
    values.cookingTime = +values.cookingTime;
    await createRecipe({
      variables: values
    });
    if (createdRecipe) {
      onSuccess(createdRecipe);
    }
    onSubmitProps.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gridTemplateRows="4rem 6rem 1fr"
            rowGap="3rem"
            columnGap="2rem"
          >
            <CInput
              name="name"
              label="Name"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
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
              helperText={touched.cookingTime && errors.cookingTime}
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
              helperText={touched.description && errors.description}
              sx={{ gridColumn: 'span 4' }}
            />
            <CDropzone
              sx={{ gridColumn: 'span 4' }}
              uploadedFileSrc={uploadedFile || ''}
              accept={{
                'image/png': ['.png', '.jpg', '.jpeg']
              }}
              multiple={false}
              onDrop={async (acceptedFiles) => {
                const [file] = acceptedFiles;
                const { data } = await uploadFile({ variables: { file } });
                setFieldValue('picturePath', data?.uploadFile);
              }}
            />
          </Box>
          <Box marginTop="2rem" display="flex" flexDirection="column" gap="4rem">
            <FieldArray name="ingredients">
              {({ push, remove }) => {
                return (
                  <IngredientsInputArray
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    push={push}
                    remove={remove}
                    ingredients={values.ingredients}
                  />
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
              helperText={touched.instructions && errors.instructions}
            />
            <CButton primary fullWidth type="submit">
              Create
            </CButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};