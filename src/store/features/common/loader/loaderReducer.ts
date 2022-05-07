import { createSlice } from '@reduxjs/toolkit';
import loaderAction, { initialState, LoaderState } from './loaderAction';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: initialState,
  reducers: loaderAction,
});

export const { startLoading, endLoading } = loaderSlice.actions;
export const getLoaderState = (state: any): LoaderState => state.loader;

export default loaderSlice.reducer;
