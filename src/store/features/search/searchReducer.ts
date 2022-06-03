import searchAction, { initialState, SearchState } from './searchAction';
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: searchAction,
});

export const actions = searchSlice.actions;

export const getSearchState = (state: any): SearchState => state.search;

export default searchSlice.reducer;
