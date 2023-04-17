import { Chip as MuiChip, TextField as MuiTextField, InputLabel as MuiLabel, styled, alpha } from '@mui/material';

export const Label = styled(MuiLabel)({
  transform: 'translate(0, -1.5rem) scale(0.875)'
});

export const Chip = styled(MuiChip)({
  borderRadius: '2px'
});

export const TextField = styled(MuiTextField)((props) => ({
  backgroundColor: alpha(props.theme.palette.background.default, 0.9),
  borderRadius: 1
}));
