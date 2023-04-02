import React from 'react';
import { Alert, Snackbar, Slide, type SlideProps } from '@mui/material';
import type { Color } from '@material-ui/lab';

import { useSnackMessages } from './useSnackMessages';

/**
 * Transition component enabling the slide-up animation
 */
const SlideUp = (props: Omit<SlideProps, 'direction'>): JSX.Element => {
  return <Slide {...props} direction="up" />;
};

/**
 * Snackbar properties
 */
export interface CSnackbarProps {
  message: React.ReactNode;
  severity: Color;
  timestamp: number;
  autoHideDuration?: number | null;
  children?: React.ReactNode;
  testId?: string;
}

/**
 * Snackbar component with features like
 *  - automatic hiding
 *  - slide up animation
 *  - action buttons which can be added via children property
 */
export const CSnackbar: React.FC<CSnackbarProps> = ({
  message,
  severity,
  timestamp,
  autoHideDuration = 6000,
  children: action = null,
  testId = 'CSnackbar'
}: CSnackbarProps) => {
  const { currentMessage, isVisible, hide } = useSnackMessages(message, severity, action, timestamp);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    hide();
  };

  if (!currentMessage) {
    return null;
  }

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
      <Alert
        data-testid={`${testId}-alert`}
        severity={currentMessage.severity}
        elevation={4}
        variant="filled"
        action={currentMessage.action}
        onClose={handleClose}
      >
        {currentMessage.message}
      </Alert>
    </Snackbar>
  );
};
