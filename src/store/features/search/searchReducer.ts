import searchAction, { initialState } from './searchAction';
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: searchAction,
});

export const actions = searchSlice.actions;

export const getSearchState = (state: any) => state.search;

export default searchSlice.reducer;
