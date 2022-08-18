import { PayloadAction } from '@reduxjs/toolkit';
import {
  Score,
  PatchScore,
  PostScore,
  ScoreAssign,
} from '../../../utils/nia153/interfaces/score';
import { Search } from '../../../utils/nia153/interfaces/search';

export interface ScoreState {
  scoreList: Score[];
  assignList: ScoreAssign[];
  selectScore: Score | null;
  selectAssign: ScoreAssign | null;
  postScore: PostScore | null;
  patchScore: PatchScore | null;
  time: string | null;
}

export const initialState: ScoreState = {
  scoreList: [],
  assignList: [],
  selectScore: null,
  selectAssign: null,
  postScore: null,
  patchScore: null,
  time: null,
};

const scoreAction = {
  getList: (state: ScoreState) => {
    state.scoreList = [];
  },
  assign: (state: ScoreState) => {
    state.time = null;
    state.scoreList = [];
  },
  selectScore: (state: ScoreState, action: PayloadAction<number>) => {
    state.selectScore = null;
  },
  createScore: (state: ScoreState, action: PayloadAction<PostScore>) => {
    state.postScore = action.payload;
  },
  updateScore: (state: ScoreState, action: PayloadAction<PatchScore>) => {
    state.patchScore = action.payload;
  },
};

export default scoreAction;
