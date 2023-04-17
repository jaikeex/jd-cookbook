import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  themeMode: 'light' | 'dark';
}

const initialState: ThemeState = {
  themeMode: 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    }
  }
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
