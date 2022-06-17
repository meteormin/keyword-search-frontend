import { PayloadAction } from '@reduxjs/toolkit';
import { StatsTask } from '../../../utils/nia15/interfaces/statics';

export interface StatsState {
  statsTask: StatsTask;
  excelFile: any | null;
}

export const initialState: StatsState = {
  statsTask: {
    count: 0,
    task: [],
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
};
export default statsAction;
