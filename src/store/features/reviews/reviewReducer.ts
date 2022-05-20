import { createSlice } from '@reduxjs/toolkit';
import reviewAction, { initialState, ReviewState } from './reviewAction';

const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: reviewAction,
});

export const actions = reviewSlice.actions;
export const getReviewState = (state: any): ReviewState => state.review;

export default reviewSlice.reducer;
