import { createSlice } from '@reduxjs/toolkit';

export interface LoaderState {
  isLoading: boolean;
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state: LoaderState) => {
      state.isLoading = true;
    },
    endLoading: (state: LoaderState) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, endLoading } = loaderSlice.actions;
export const selectIsLoading = (state: any): boolean => state.loader.isLoading;
export default loaderSlice.reducer;
