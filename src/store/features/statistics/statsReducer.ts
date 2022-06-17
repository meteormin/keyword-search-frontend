import { createSlice } from '@reduxjs/toolkit';
import statsAction, { initialState, StatsState } from './statsAction';

const statsSlice = createSlice({
  name: 'statistics',
  initialState: initialState,
  reducers: statsAction,
});

export const actions = statsSlice.actions;

export const getStatsState = (state: any): StatsState => state.statistics;

export default statsSlice.reducer;
