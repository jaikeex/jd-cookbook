import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'core/types';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
