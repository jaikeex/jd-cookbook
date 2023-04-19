import React, { useCallback } from 'react';
import { Box, TextField, alpha, FormControl, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { CButton, CMultiSelect, CSelect } from 'components';
import type { Ingredient } from 'types';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import { useQuery } from '@apollo/client';
import { GET_ALL_INGREDIENTS_QUERY } from '@home/graphql';

interface SearchFormValues {
  query: string;
  ingredients: Ingredient[];
  difficulty: 'easy' | 'medium' | 'hard' | 'all';
}

const initialFormValues: SearchFormValues = {
  query: '',
  ingredients: [],
  difficulty: 'all'
};

interface OptionType {
  label: string;
  value: string;
}

export interface SearchFormProps {
  onSubmit?: (values: SearchFormValues, formikHelpers: FormikHelpers<SearchFormValues>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit = () => {} }): JSX.Element => {
  const theme = useTheme();
  const sm = useMediaQuery('(max-width:768px)');
  const { loading, data } = useQuery<{ getAllIngredients: Ingredient[]; }>(GET_ALL_INGREDIENTS_QUERY);

  const options: OptionType[] = data?.getAllIngredients.map(({ name }) => ({ label: name, value: name })) || [];

  const handleIngredientsSelect = (
    callback: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) =>
    useCallback(
      (value: OptionType[] | null) => {
        if (value) {
          callback(
            'ingredients',
            value.map((val) => val.value)
          );
        }
      },
      [callback]
    );

  console.log(loading);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialFormValues}>
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box>
            <TextField
              data-testid="search-form-name"
              sx={{
                backgroundColor: alpha(theme.palette.background.default, 0.85),
                borderRadius: 1,
                mb: 2
              }}
              size="small"
              placeholder="Search recipes..."
              name="query"
              value={values.query}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box display="flex" flexDirection={sm ? 'column' : 'row'} gap={4} mt={4}>
            <CMultiSelect
              data-testid="search-form-ingredient-select"
              label="Ingredients"
              options={options}
              loading={loading}
              size="small"
              id="ingredients-select"
              sx={{ minWidth: '70%' }}
              onChange={handleIngredientsSelect(setFieldValue)}
            />
            <FormControl fullWidth>
              <CSelect
                data-testid="search-form-difficulty-select"
                sx={{
                  backgroundColor: alpha(theme.palette.background.default, 0.85),
                  borderRadius: 1,
                  mb: 2
                }}
                id="difficulty-select"
                name="difficulty"
                label="Difficulty"
                value={values.difficulty}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </CSelect>
            </FormControl>
          </Box>
          <CButton type="submit" primary sx={{ mt: '1rem' }} data-testid="search-form-button">
            Search
          </CButton>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
