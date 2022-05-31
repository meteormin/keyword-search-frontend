import { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  dataId: string;
  sentence: string;
  posLength: number;
  tagged: string;
  refSrc: string;
  domain: string;
  refId: string;
  edges?: {
    concepts: Concept[];
  };
}

export interface Concept {
  stem: string;
  posttag: string;
}

export interface TaskState {
  time: string | null;
  totalCount: number;
  taskList: Task[];
  workTask: Task | null;
}

export const initialState: TaskState = {
  time: null,
  totalCount: 0,
  taskList: [],
  workTask: null,
};

const taskAction = {
  assign: (state: TaskState) => {
    state.taskList = [];
    state.totalCount = 0;
  },
  getTaskList: (
    state: TaskState,
    action: PayloadAction<{ limit: number; page: number }>,
  ) => {
    state.taskList = [];
  },
  setTaskList: (state: TaskState, action: PayloadAction<Task[]>) => {
    state.taskList = action.payload;
  },
  setWorkTask: (state: TaskState, action: PayloadAction<Task | null>) => {
    state.workTask = action.payload;
  },
  getWorkTask: (state: TaskState, action: PayloadAction<number>) => {
    state.workTask = null;
  },
  setCount: (state: TaskState, action: PayloadAction<number>) => {
    state.totalCount = action.payload;
  },
  getExpiredAt: (state: TaskState) => {
    state.time = null;
  },
  setTime: (state: TaskState, action: PayloadAction<string>) => {
    state.time = action.payload;
  },
};

export default taskAction;
