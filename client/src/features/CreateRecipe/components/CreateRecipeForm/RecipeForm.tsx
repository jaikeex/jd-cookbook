import React, { useCallback } from 'react';
import * as yup from 'yup';
import type { Ingredient, Recipe } from 'types';
import { useFileUpload } from 'hooks';
import { Form, FieldArray, Formik } from 'formik';
import { Box, MenuItem, Typography } from '@mui/material';
import { CButton, CDropzone, CInput, CSelect } from 'components';
import { IngredientsInputArray } from '@createRecipe/components/IngredientsInputArray';

export interface CreateRecipeFormProps {
  onSubmit: (values: CreateRecipeFormValues) => void;
  recipe?: Recipe;
}

const validationSchema = yup.object().shape({
  name: yup.string().max(50).required('Name is required'),
  description: yup.string().max(255, 'Description must be at most 255 characters long').notRequired(),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Ingredient name is required'),
        amount: yup.string().notRequired()
      })
    )
    .min(1, 'At least one ingredient is required'),
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

export const RecipeForm: React.FC<CreateRecipeFormProps> = ({ onSubmit, recipe }): JSX.Element => {
  const { uploadFile, uploadedFile } = useFileUpload();

  const handleImageUpload = useCallback(
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) =>
      async <T extends File>(acceptedFiles: T[]) => {
        const [file] = acceptedFiles;
        const { data } = await uploadFile({ variables: { file } });
        setFieldValue('picturePath', data?.uploadFile);
      },
    [uploadFile]
  );

  const handleFormSubmit = useCallback(
    async (values: CreateRecipeFormValues) => {
      values.cookingTime = +values.cookingTime;
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <Formik initialValues={recipe || initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <Typography variant="h2" sx={{ mb: 8 }}>
            {recipe ? 'Edit recipe' : 'Create new recipe'}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gridTemplateRows="4rem 6rem 1fr"
            rowGap="3rem"
            columnGap="2rem"
          >
            <CInput
              name="name"
              label="Name *"
              data-testid="create-form-name"
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
              label="Cooking time *"
              data-testid="create-form-cooking-time"
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
              data-testid="create-form-difficulty"
              label="Difficulty *"
              size="medium"
              value={values.difficulty}
              onChange={handleChange}
              error={touched.difficulty && Boolean(errors.difficulty)}
            >
              <MenuItem value={'easy'}>Easy</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'hard'}>Hard</MenuItem>
            </CSelect>
            <CInput
              name="description"
              label="Description"
              data-testid="create-form-description"
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
              uploadedFileSrc={uploadedFile || ''}
              accept={{
                'image/png': ['.png', '.jpg', '.jpeg']
              }}
              multiple={false}
              data-testid="create-form-dropzone"
              onDrop={handleImageUpload(setFieldValue)}
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
                    error={touched.ingredients && Boolean(errors.ingredients)}
                  />
                );
              }}
            </FieldArray>

            <CInput
              name="instructions"
              label="Instructions *"
              data-testid="create-form-instructions"
              fullWidth
              multiline
              rows={4}
              value={values.instructions}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.instructions && Boolean(errors.instructions)}
              helperText={(touched.instructions && errors.instructions) || ' '}
            />
          </Box>
          <CButton primary fullWidth type="submit" sx={{ mt: 2 }} data-testid="create-form-create-button">
            Save
          </CButton>
          <Typography variant="caption"> * required</Typography>
        </Form>
      )}
    </Formik>
  );
};
