import { createSlice } from '@reduxjs/toolkit';
import action, { HostState, initialState } from 'store/features/hosts/action';

const slice = createSlice({
    name: 'hosts',
    initialState: initialState,
    reducers: action,
});

export const actions = slice.actions;
export const getState = (state: any): HostState => state.hosts;

export default slice.reducer;
