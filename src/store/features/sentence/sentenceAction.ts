import { auth } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  dataId: string;
  sentence: string;
  concepts: Concept[];
  posLength: number;
  tagged: string;
  refSrc: string;
  domain: string;
  refId: string;
}

export interface Concept {
  stem: string;
  posttag: string;
}

export interface SentenceState {
  time: string | null;
  taskList: Task[];
  workTask: Task | null;
}

export const initialState: SentenceState = {
  time: null,
  taskList: [],
  workTask: null,
};

const sentenceAction = {
  getTaskList: (
    state: SentenceState,
    action: PayloadAction<{ limit: number; page: number }>,
  ) => {
    state.taskList = [];
  },
  setTaskList: (state: SentenceState, action: PayloadAction<Task[]>) => {
    state.taskList = action.payload;
  },
  setWorkTask: (state: SentenceState, action: PayloadAction<Task>) => {
    state.workTask = action.payload;
  },
};

export default sentenceAction;
