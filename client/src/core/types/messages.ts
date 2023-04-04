import type { ReactNode } from 'react';
import type { Color } from '@material-ui/lab';

export interface SnackMessage {
  message: ReactNode;
  severity: Color;
  origin: string;
  timestamp: number;
}
