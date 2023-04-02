import { useReactiveVar } from '@apollo/client';

import { globalMessage } from 'utils';
import type { IMessage } from 'types';

export const useMessage = (): IMessage => {
  const message = useReactiveVar(globalMessage);

  return message;
};
