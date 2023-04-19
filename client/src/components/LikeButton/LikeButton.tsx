import { FavoriteBorder, Favorite } from '@mui/icons-material';
import type { CheckboxProps } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import * as React from 'react';

export interface LikeButtonProps extends CheckboxProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  defaultChecked = false,
  disabled = false,
  label = '',
  labelPlacement = 'end',
  onChange = () => {},
  ...props
}): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite color="error" />}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default LikeButton;
