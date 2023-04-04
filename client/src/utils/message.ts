import { makeVar } from '@apollo/client';
import type { ReactNode } from 'react';
import type { Color } from '@material-ui/lab';
import type { SnackMessage } from 'core/types';

export const globalMessage = makeVar<SnackMessage>({
  message: undefined,
  severity: 'info',
  origin: 'unknown',
  timestamp: Date.now()
});

/**
 * Set current global (snack) message.
 *
 * @param message Message to be shown
 * @param severity Message type: info, success, warning, error
 * @param origin Name of a caller function or function component
 */
export const setMessage = (message: ReactNode, severity: Color, origin: string): void => {
  const newMessage: SnackMessage = {
    message,
    severity,
    origin,
    timestamp: Date.now()
  };

  globalMessage(newMessage);
};
