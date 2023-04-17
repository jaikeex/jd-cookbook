import { Select as MuiSelect, InputLabel as MuiLabel, styled } from '@mui/material';
import { CSelectProps } from './CSelect';

export const Select = styled(MuiSelect)<CSelectProps>((props) => ({
  ...(props.size === 'medium' && {
    '& > div': {
      padding: '0.75rem'
    }
  }),

  input: {
    '&::placeholder': {
      fontSize: '0.913rem',
      color: props.theme.palette.text.primary
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 100px ${props.theme.palette.background.default} inset`
    }
  }
}));

export const Label = styled(MuiLabel)((props) => ({
  transform: 'translate(0, -1.5rem) scale(0.875)',
  color: props.theme.palette.text.primary
}));
