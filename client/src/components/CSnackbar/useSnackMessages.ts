import { useEffect, useState, type ReactNode } from 'react';
import type { Color } from '@material-ui/lab';

export interface ISnackMessage {
  message: ReactNode;
  severity: Color;
  action: ReactNode;
  timestamp: number;
}

export interface IUseSnackMessages {
  currentMessage: ISnackMessage | undefined;
  isVisible: boolean;
  hide: () => void;
}

interface IState {
  visible: boolean;
  messages: ISnackMessage[];
  current: ISnackMessage | undefined;
}

export const useSnackMessages = (
  message: ReactNode,
  severity: Color,
  action: ReactNode,
  timestamp: number
): IUseSnackMessages => {
  const [state, setState] = useState<IState>({
    visible: false,
    messages: [],
    current: undefined
  });

  useEffect(() => {
    setState((prevState) => ({
      visible: true,
      messages: [{ message, severity, action, timestamp }, ...prevState.messages],
      current: { message, severity, action, timestamp }
    }));
  }, [message, severity, action, timestamp]);

  const hide = () => {
    const messageCount = state.messages.length;

    if (messageCount > 1) {
      setState((prevState) => ({
        visible: true,
        messages: prevState.messages.slice(1),
        current: { ...prevState.messages[1] }
      }));
    } else if (messageCount === 1) {
      setState({
        visible: false,
        messages: [],
        current: undefined
      });
    }
  };

  return { currentMessage: state.current, isVisible: state.visible, hide };
};
