import { createSlice } from '@reduxjs/toolkit';
import questionAction, { initialState, QuestionState } from './questionAction';

const questionSlice = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: questionAction,
});

export const actions = questionSlice.actions;
export const getQuestionState = (state: any): QuestionState => state.question;

export default questionSlice.reducer;
