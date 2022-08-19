import { PayloadAction } from '@reduxjs/toolkit';
import {
  Score,
  PatchScore,
  PostScore,
  ScoreAssignList,
  ScoreAssign,
  ScoreList,
} from '../../../utils/nia153/interfaces/score';
import { Search } from '../../../utils/nia153/interfaces/search';

export interface ScoreState {
  scoreList: {
    count: number;
    data: ScoreList[];
  };
  assignList: {
    count: number;
    data: ScoreAssignList[];
  };
  selectScore: {
    data: Score | null;
    leftCount: number;
    createdCount: number;
  };
  selectAssign: {
    data: ScoreAssign | null;
    leftCount: number;
    createdCount: number;
  };
  postScore: PostScore | null;
  patchScore: PatchScore | null;
  time: string | null;
}

export const initialState: ScoreState = {
  scoreList: {
    count: 0,
    data: [],
  },
  assignList: {
    count: 0,
    data: [],
  },
  selectScore: {
    data: null,
    leftCount: 0,
    createdCount: 0,
  },
  selectAssign: {
    data: null,
    leftCount: 0,
    createdCount: 0,
  },
  postScore: null,
  patchScore: null,
  time: null,
};

const scoreAction = {
  setList: (
    state: ScoreState,
    action: PayloadAction<{ count: number; data: ScoreList[] }>,
  ) => {
    state.scoreList = action.payload;
  },
  getList: (state: ScoreState) => {
    state.scoreList.count = 0;
    state.scoreList.data = [];
  },
  postAssign: (state: ScoreState) => {
    state.time = null;
    state.assignList.count = 0;
    state.assignList.data = [];
  },
  setAssignList: (
    state: ScoreState,
    action: PayloadAction<{ count: number; data: ScoreAssignList[] }>,
  ) => {
    state.assignList = action.payload;
  },
  getAssignList: (state: ScoreState) => {
    state.time = null;
    state.assignList.count = 0;
    state.assignList.data = [];
  },
  selectAssign: (state: ScoreState, action: PayloadAction<number>) => {
    state.selectAssign.data = null;
  },
  setAssign: (
    state: ScoreState,
    action: PayloadAction<{
      data: ScoreAssign | null;
      leftCount: number;
      createdCount: number;
    }>,
  ) => {
    state.selectAssign = action.payload;
  },
  selectScore: (state: ScoreState, action: PayloadAction<number>) => {
    state.selectScore.data = null;
  },
  setScore: (
    state: ScoreState,
    action: PayloadAction<{
      data: Score | null;
      leftCount: number;
      createdCount: number;
    }>,
  ) => {
    state.selectScore = action.payload;
  },
  createScore: (state: ScoreState, action: PayloadAction<PostScore>) => {
    state.postScore = action.payload;
  },
  updateScore: (state: ScoreState, action: PayloadAction<PatchScore>) => {
    state.patchScore = action.payload;
  },
};

export default scoreAction;
