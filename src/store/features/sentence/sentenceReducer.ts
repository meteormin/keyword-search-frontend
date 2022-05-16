import { createSlice } from '@reduxjs/toolkit';
import sentenceAction, { initialState, SentenceState } from './sentenceAction';

const sentenceSlice = createSlice({
  name: 'sentence',
  initialState: initialState,
  reducers: sentenceAction,
});

export const actions = sentenceSlice.actions;

export const getSentenceState = (state: any): SentenceState => state.sentence;

export default sentenceSlice.reducer;
