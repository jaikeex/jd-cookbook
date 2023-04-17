import { Box, TextField, alpha, FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material';
import { CButton } from 'components';
import type { Ingredient } from 'core';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as React from 'react';
import { AsyncMultiSelect } from 'features';
import { CSelect } from 'components/CSelect';

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

  return (
    <Formik onSubmit={onSubmit} initialValues={initialFormValues}>
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box>
            <TextField
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
          <Box display="flex" gap={4}>
            <AsyncMultiSelect
              multiple={true}
              size="small"
              variant="outlined"
              id="ingredients"
              placeholder="Select ingredients..."
              sx={{ minWidth: '70%' }}
              onChange={(_: React.ChangeEvent, value: OptionType[]) =>
                setFieldValue(
                  'ingredients',
                  value.map((val) => val.value)
                )
              }
            />
            <FormControl fullWidth>
              <CSelect
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
          <CButton type="submit" primary sx={{ mt: '1rem' }}>
            Search
          </CButton>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
