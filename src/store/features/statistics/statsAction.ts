import { PayloadAction } from '@reduxjs/toolkit';
import {
  StatsTask,
  StatsCreator,
} from '../../../utils/nia15/interfaces/statics';

export interface StatsState {
  statsTask: StatsTask;
  statsCreator: StatsCreator;
  excelFile: any | null;
}

export const initialState: StatsState = {
  statsTask: {
    count: 0,
    task: [],
  },
  statsCreator: {
    count: 0,
    statistic: [],
  },
  excelFile: null,
};

const statsAction = {
  getTaskStats: (state: StatsState) => {
    state.statsTask = {
      count: 0,
      task: [],
    };
  },
  setTaskStats: (state: StatsState, action: PayloadAction<StatsTask>) => {
    state.statsTask = action.payload;
  },
  downloadTask: (state: StatsState) => {
    state.excelFile = null;
  },
  setExcelFile: (state: StatsState, action: PayloadAction<any>) => {
    state.excelFile = action.payload;
  },
  setCreatorStats: (state: StatsState, action: PayloadAction<StatsCreator>) => {
    state.statsCreator = action.payload;
  },
  getCreatorStats: (state: StatsState) => {
    state.statsCreator = {
      count: 0,
      statistic: [],
    };
  },
  downloadCreator: (state: StatsState) => {
    state.excelFile = null;
  },
};
export default statsAction;
