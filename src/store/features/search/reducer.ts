import { createSlice } from '@reduxjs/toolkit';
import action, {
    SearchState,
    initialState,
} from 'store/features/search/action';

const slice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: action,
});

export const actions = slice.actions;
export const getState = (state: any): SearchState => state.search;

export default slice.reducer;
