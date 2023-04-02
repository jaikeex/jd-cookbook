import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'types';

interface AuthState {
  mode: 'light' | 'dark';
  user: User | null;
  recipes: string[];
}

const initialState: AuthState = {
  mode: 'dark',
  user: null,
  recipes: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      console.log('SETTING MODE');
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
