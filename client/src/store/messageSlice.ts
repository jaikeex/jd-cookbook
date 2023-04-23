import { createSlice } from '@reduxjs/toolkit';
import type { SnackMessage } from 'types';

interface MessagesState {
  messageQueue: SnackMessage[];
  currentMessage?: SnackMessage | null;
}

const initialState: MessagesState = {
  messageQueue: []
};

interface AddMessagePayload {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  origin?: string;
}

interface AddMessageAction {
  payload: AddMessagePayload;
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: AddMessageAction) => {
      const { message, severity, origin } = action.payload;

      const newMessage: SnackMessage = {
        message,
        severity,
        origin: origin || '',
        timestamp: Date.now()
      };

      if (state.currentMessage) {
        state.messageQueue = [...state.messageQueue, newMessage];
      } else {
        state.currentMessage = newMessage;
      }
    },

    popMessage: (state) => {
      if (state.messageQueue.length > 0) {
        state.currentMessage = state.messageQueue.splice(0, 1).at(0);
      } else {
        state.currentMessage = null;
      }
    }
  }
});

export const { addMessage, popMessage } = messageSlice.actions;
export default messageSlice.reducer;
