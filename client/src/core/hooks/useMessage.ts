import { useReactiveVar } from '@apollo/client';

import { globalMessage } from 'utils';
import type { SnackMessage } from 'core/types';

export const useMessage = (): SnackMessage => {
  const message = useReactiveVar(globalMessage);

  return message;
};
