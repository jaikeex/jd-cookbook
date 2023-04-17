import { createSlice } from '@reduxjs/toolkit';
import type { SnackMessage } from 'core/types';

interface MessagesState {
  messageQueue: SnackMessage[];
  currentMessage?: SnackMessage;
}

const initialState: MessagesState = {
  messageQueue: []
};

interface SetMessagePayload {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  origin: string;
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, severity, origin } = action.payload as SetMessagePayload;

      const newMessage: SnackMessage = {
        message,
        severity,
        origin,
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
        state.currentMessage = undefined;
      }
    }
  }
});

export const { addMessage, popMessage } = messageSlice.actions;
export default messageSlice.reducer;
