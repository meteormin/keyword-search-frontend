import { createSlice } from '@reduxjs/toolkit';
import taskAction, { initialState, TaskState } from './taskAction';

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: taskAction,
});

export const actions = taskSlice.actions;

export const getTaskState = (state: any): TaskState => state.task;

export default taskSlice.reducer;
