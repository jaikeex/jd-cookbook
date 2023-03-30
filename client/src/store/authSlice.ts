import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  mode: 'light' | 'dark';
  user: string | null;
  token: string | null;
  recipes: string[];
}

const initialState: AuthState = {
  mode: 'light',
  user: null,
  token: null,
  recipes: []
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
