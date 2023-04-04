import React, { useState } from 'react';
import { Alert, Snackbar, Slide, type SlideProps } from '@mui/material';
import type { Color } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { popMessage } from 'store/messageSlice';

const SlideUp = (props: Omit<SlideProps, 'direction'>): JSX.Element => {
  return <Slide {...props} direction="up" />;
};

export interface CSnackbarProps {
  message: React.ReactNode;
  severity: Color;
  autoHideDuration?: number | null;
  testId?: string;
}

export const CSnackbar: React.FC<CSnackbarProps> = ({
  message,
  severity,
  autoHideDuration = 6000,
  testId = 'CSnackbar'
}: CSnackbarProps) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsVisible(false);
    dispatch(popMessage());
  };

  return (
    <Snackbar
      data-testid={testId}
      open={isVisible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={autoHideDuration}
      transitionDuration={400}
      TransitionComponent={SlideUp}
      onClose={handleClose}
    >
      <Alert data-testid={`${testId}-alert`} severity={severity} elevation={4} variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
