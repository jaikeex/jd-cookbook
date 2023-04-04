import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'core/types';

interface AuthState {
  mode: 'light' | 'dark';
  user: User | null;
}

const initialState: AuthState = {
  mode: 'dark',
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    }
  }
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
