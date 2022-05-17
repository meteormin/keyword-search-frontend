import { auth } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Sentence {
  id: number;
  sentence_1: string;
  sentence_2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  taskId: number;
  userId: number;
}

export interface CreateSentence {
  sentence_1: string;
  sentence_2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  taskId: number;
}

export interface SentenceState {
  totalCount: number;
  sentences: Sentence[];
  createSentence: CreateSentence | null;
  editSentence: Sentence | null;
}

export const initialState: SentenceState = {
  totalCount: 0,
  sentences: [],
  createSentence: null,
  editSentence: null,
};

const sentenceAction = {
  getSentenceList: (
    state: SentenceState,
    action: PayloadAction<{ limit: number; page: number }>,
  ) => {
    state.sentences = [];
  },
  setSentenceList: (
    state: SentenceState,
    action: PayloadAction<Sentence[]>,
  ) => {
    state.sentences = action.payload;
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
  createSentence: (
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
