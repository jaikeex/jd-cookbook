import { Box, TextField, alpha, FormControl, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { CButton } from 'components';
import type { Ingredient } from 'core';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as React from 'react';
import { CSelect } from 'components/CSelect';
import { CMultiSelect } from 'components/CMultiSelect';
import { useQuery } from '@apollo/client';
import { GET_ALL_INGREDIENTS_QUERY } from 'features/Home/graphql';

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
  const { loading, data } = useQuery<{ getAllIngredients: Ingredient[]; }>(GET_ALL_INGREDIENTS_QUERY);

  const options: OptionType[] = data?.getAllIngredients.map(({ name }) => ({ label: name, value: name })) || [];

  const sm = useMediaQuery('(max-width:740px)');

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
              onChange={(value: OptionType[] | null) => {
                if (value) {
                  setFieldValue(
                    'ingredients',
                    value.map((val) => val.value)
                  );
                }
              }}
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
