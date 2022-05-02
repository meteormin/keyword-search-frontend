import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, endLoading } = loaderSlice.actions;
export const selectIsLoading = (state) => state.loader.isLoading;
export default loaderSlice.reducer;
