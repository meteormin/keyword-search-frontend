import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    start: (state) => {
      state.isLoading = true;
    },
    end: (state) => {
      state.isLoading = false;
    },
  },
});

export const { start, end } = loaderSlice.actions;
export const selectIsLoading = (state) => state.loader.isLoading;
export default loaderSlice.reducer;
