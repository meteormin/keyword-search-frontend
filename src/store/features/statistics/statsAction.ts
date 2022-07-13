import { PayloadAction } from '@reduxjs/toolkit';
import {
  StatsTask,
  StatsCreator,
  StatsReviewer,
} from '../../../utils/nia15/interfaces/statics';

export interface StatsState {
  statsTask: StatsTask;
  statsCreator: StatsCreator;
  statsReviewer: StatsReviewer;
  excelFile: any | null;
  jsonFile: any | null;
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
  statsReviewer: {
    seq: 1,
    count: 0,
    statistic: [],
  },
  excelFile: null,
  jsonFile: null,
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
  downloadReport: (state: StatsState) => {
    state.jsonFile = null;
  },
  setJsonFile: (state: StatsState, action: PayloadAction<any>) => {
    state.jsonFile = action.payload;
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
  getReviewerStats: (state: StatsState, action: PayloadAction<number>) => {
    state.statsReviewer = {
      seq: action.payload,
      count: 0,
      statistic: [],
    };
  },
  setReviewerStats: (
    state: StatsState,
    action: PayloadAction<StatsReviewer>,
  ) => {
    state.statsReviewer = action.payload;
  },
  downloadReviewer: (state: StatsState, action: PayloadAction<number>) => {
    if (state.statsReviewer.seq == action.payload) {
      state.excelFile = null;
    } else {
      state.statsReviewer = {
        seq: action.payload,
        statistic: [],
        count: 0,
      };
    }
  },
};
export default statsAction;
