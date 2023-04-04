import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { alpha, Autocomplete, CircularProgress, TextField, useTheme } from '@mui/material';
import { GET_ALL_INGREDIENTS_QUERY } from 'core/graphql/queries';

interface Ingredient {
  name: string;
  amount: string;
}

interface OptionType {
  label: string;
  value: string;
}

interface AsyncMultiSelectProps {
  onChange?: (value: OptionType[]) => void;
}

const AsyncMultiSelect: React.FC<AsyncMultiSelectProps> = ({ onChange = () => {} }) => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const { loading, error, data } = useQuery<{ getAllIngredients: Ingredient[]; }>(GET_ALL_INGREDIENTS_QUERY);

  if (error) {
    return <div>Error fetching data</div>;
  }

  const options: OptionType[] = data?.getAllIngredients.map(({ name }) => ({ label: name, value: name })) || [];

  const handleChange = (_event: React.ChangeEvent<any>, value: OptionType[]) => {
    setSelectedOptions(value);
    onChange(value);
  };

  return (
    <Autocomplete
      multiple
      id="async-multi-select"
      options={options}
      value={selectedOptions}
      getOptionLabel={(option: OptionType) => option.label}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select ingredients..."
          variant="outlined"
          sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.85),
            borderRadius: 1
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default AsyncMultiSelect;
