import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';

export interface ConfirmDeleteDialogProps {
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open?: boolean;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  onClose,
  onConfirm,
  open = false
}): JSX.Element => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Are you sure you want to delete this recipe?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
