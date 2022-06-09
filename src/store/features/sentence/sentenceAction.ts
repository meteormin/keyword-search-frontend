import { PayloadAction } from '@reduxjs/toolkit';
import {
  Sentence,
  SentenceHistory,
  CreateSentence,
} from '../../../utils/nia15/interfaces/sentences';

export interface SentenceState {
  totalCount: number;
  sentences: Sentence[];
  sentenceHistory: SentenceHistory[];
  createSentence: CreateSentence | null;
  editSentence: Sentence | null;
}

export const initialState: SentenceState = {
  totalCount: 0,
  sentences: [],
  sentenceHistory: [],
  createSentence: null,
  editSentence: null,
};

const sentenceAction = {
  getSentenceList: (state: SentenceState) => {
    state.sentences = [];
  },
  setSentenceList: (
    state: SentenceState,
    action: PayloadAction<Sentence[]>,
  ) => {
    state.sentences = action.payload;
  },
  setSentenceHistories: (
    state: SentenceState,
    action: PayloadAction<SentenceHistory[]>,
  ) => {
    state.sentenceHistory = action.payload;
  },
  setSentence: (
    state: SentenceState,
    action: PayloadAction<Sentence | null>,
  ) => {
    state.editSentence = action.payload;
  },
  getSentence: (state: SentenceState, action: PayloadAction<number>) => {
    state.editSentence = null;
  },
  setCreateSentence: (
    state: SentenceState,
    action: PayloadAction<CreateSentence>,
  ) => {
    state.createSentence = action.payload;
  },
  createSentence: (
    state: SentenceState,
    action: PayloadAction<CreateSentence>,
  ) => {
    state.createSentence = action.payload;
  },
  createTempSentence: (
    state: SentenceState,
    action: PayloadAction<CreateSentence>,
  ) => {
    state.createSentence = action.payload;
  },
  updateSentence: (state: SentenceState, action: PayloadAction<Sentence>) => {
    state.editSentence = action.payload;
  },
  tempSentence: (state: SentenceState, action: PayloadAction<Sentence>) => {
    state.editSentence = action.payload;
  },
  setCount: (state: SentenceState, action: PayloadAction<number>) => {
    state.totalCount = action.payload;
  },
};

export default sentenceAction;
