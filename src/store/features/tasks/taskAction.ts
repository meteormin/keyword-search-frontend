import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../../utils/nia15/interfaces/tasks';

export interface TaskState {
  method: string | null;
  time: string | null;
  totalCount: number;
  taskList: Task[];
  workTask: Task | null;
}

export const initialState: TaskState = {
  method: null,
  time: null,
  totalCount: 0,
  taskList: [],
  workTask: null,
};

const taskAction = {
  assign: (state: TaskState) => {
    state.method = 'POST';
    state.taskList = [];
    state.totalCount = 0;
  },
  getTaskList: (state: TaskState) => {
    state.method = 'GET';
    state.taskList = [];
  },
  setTaskList: (state: TaskState, action: PayloadAction<Task[]>) => {
    state.method = 'GET';
    state.taskList = action.payload;
  },
  setWorkTask: (state: TaskState, action: PayloadAction<Task | null>) => {
    state.workTask = action.payload;
  },
  getWorkTask: (state: TaskState, action: PayloadAction<number>) => {
    state.method = 'GET';
    state.workTask = null;
  },
  setCount: (state: TaskState, action: PayloadAction<number>) => {
    state.totalCount = action.payload;
  },
  getExpiredAt: (state: TaskState) => {
    state.method = 'GET';
    state.time = null;
  },
  setTime: (state: TaskState, action: PayloadAction<string>) => {
    state.time = action.payload;
  },
  deleteTask: (state: TaskState, action: PayloadAction<number>) => {
    state.method = 'DELETE';
  },
};

export default taskAction;
