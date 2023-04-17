import { FormHelperText, OutlinedInput as MuiInput, InputLabel as MuiLabel, styled } from '@mui/material';
import { CInputProps } from './CInput';

export const Input = styled(MuiInput)<CInputProps>((props) => ({
  input: {
    padding: '0.75rem',
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

export const HelperText = styled(FormHelperText)({
  marginLeft: 0
});
