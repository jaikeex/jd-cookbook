import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { alpha, Autocomplete, CircularProgress, TextField, useTheme } from '@mui/material';
import type { SxProps, OutlinedTextFieldProps } from '@mui/material';
import { GET_ALL_INGREDIENTS_QUERY } from 'core/graphql/queries';

interface Ingredient {
  name: string;
  amount: string;
}

interface OptionType {
  label: string;
  value: string;
}

interface AsyncMultiSelectProps<isMulti extends boolean> extends Omit<OutlinedTextFieldProps, 'onChange'> {
  id?: string;
  multiple?: isMulti;
  onChange?: (event: React.ChangeEvent, value: isMulti extends true ? OptionType[] : OptionType | null) => void;
  sx?: SxProps;
}

const AsyncMultiSelect: React.FC<AsyncMultiSelectProps<boolean>> = ({
  id = '',
  multiple,
  onChange = () => {},
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState<OptionType | OptionType[] | null>([]);
  const { loading, error, data } = useQuery<{ getAllIngredients: Ingredient[]; }>(GET_ALL_INGREDIENTS_QUERY);

  if (error) {
    return <div>Error fetching data</div>;
  }

  const options: OptionType[] = data?.getAllIngredients.map(({ name }) => ({ label: name, value: name })) || [];

  const handleChange = (event: React.ChangeEvent<any>, value: OptionType | OptionType[] | null) => {
    setSelectedOptions(value);
    onChange(event, value);
  };

  return (
    <Autocomplete
      multiple={multiple}
      id={id}
      options={options}
      value={selectedOptions}
      getOptionLabel={(option: OptionType) => option.label}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleChange}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          sx={{
            backgroundColor: alpha(theme.palette.background.default, 0.9),
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
