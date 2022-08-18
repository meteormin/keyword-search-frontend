import scoreAction, { initialState, ScoreState } from './scoreAction';
import { createSlice } from '@reduxjs/toolkit';

const scoreReducer = createSlice({
  name: 'scores',
  initialState: initialState,
  reducers: scoreAction,
});

export const actions = scoreReducer.actions;

export const getScoreState = (state: any): ScoreState => state.scores;

export default scoreReducer;
