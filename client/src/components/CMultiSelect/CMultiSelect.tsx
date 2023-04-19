import React, { useCallback, useState } from 'react';
import type { AutocompleteProps, AutocompleteRenderGetTagProps, AutocompleteRenderInputParams } from '@mui/material';
import { FormControl, Autocomplete, CircularProgress } from '@mui/material';
import * as Styled from './styles';

interface OptionType {
  label: string;
  value: string;
}

export interface CMultiSelectProps
  extends Omit<AutocompleteProps<any, true, boolean, boolean, 'div'>, 'onChange' | 'renderInput'> {
  error?: boolean;
  label?: string;
  loading?: boolean;
  onChange?: (value: OptionType[] | null) => void;
  options: OptionType[];
}

export const CMultiSelect: React.FC<CMultiSelectProps> = ({
  error = false,
  id = '',
  label = '',
  loading = false,
  onChange = () => {},
  options = [],
  sx = {},
  ...props
}): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[] | null>([]);

  const handleChange = useCallback(
    (_: React.ChangeEvent<any>, value: OptionType[] | null) => {
      setSelectedOptions(value);
      onChange(value);
    },
    [setSelectedOptions, onChange]
  );

  const renderTags = useCallback(
    (value: readonly OptionType[], getTagProps: AutocompleteRenderGetTagProps) =>
      value.map((value: OptionType, index: number) => (
        <Styled.Chip {...getTagProps({ index })} key={index} variant="filled" label={value.label} size="small" />
      )),
    []
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <Styled.TextField
        {...params}
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
    ),
    [loading]
  );

  const getOptionLabel = useCallback((option: OptionType) => option.label, []);

  const isOptionEqualToValue = useCallback((option: OptionType, value: OptionType) => option.value === value.value, []);

  return (
    <FormControl variant="outlined" sx={sx}>
      <Styled.Label error={error} htmlFor={id} variant="outlined" shrink>
        {label}
      </Styled.Label>
      <Autocomplete
        {...props}
        id={id}
        multiple
        options={options}
        value={selectedOptions || []}
        getOptionLabel={getOptionLabel}
        filterSelectedOptions
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={handleChange}
        renderTags={renderTags}
        renderInput={renderInput}
      />
    </FormControl>
  );
};
