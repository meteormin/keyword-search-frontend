import { PayloadAction } from '@reduxjs/toolkit';
import { Concept, Task } from '../tasks/taskAction';
import { User } from '../users/userAction';
import { ReviewStatus, SentenceReview } from '../reviews/reviewAction';

export interface SentenceReviewReject {
  id: number;
  memo: string;
  rejectReason: number;
}

export interface SentenceChild {
  id: number;
  sentence: string;
  sentenceCount: number;
  sentencePatterned: string;
  sentencePatternedModified: string;
  edges?: {
    sentenceReviewReject: SentenceReviewReject[];
  };
}

export interface Sentence {
  id: number;
  status: ReviewStatus;
  taskId: number;
  userId: number;
  createAt?: string | null;
  updateAt?: string | null;
  edges?: {
    task: Task;
    user: User;
    sentence1: SentenceChild;
    sentence2: SentenceChild;
    sentenceReviews1: SentenceReview;
    sentenceReviews2: SentenceReview;
  };
}

export interface CreateSentence {
  sentence1: string;
  sentence2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  sentence1Count: number;
  sentence2Count: number;
  taskId: number;
}

export interface SentenceHistory {
  id: number;
  refId: string;
  concepts: Concept[];
  posLength: number;
  created1Length: number;
  created2Length: number;
  createState?: CreateState;
  creatorId: string;
  createdAt: string;
  reviewer1Id: string;
  review1At: string;
  reviewer2Id: string;
  review2At: string;
  reviewResult: ReviewStatus;
  reviewRsTxt?: string;
  reviewReasons: number[];
}

export enum CreateState {
  WAIT = '생성대기',
  COMPLETE = '생성완료',
  TEMP = '작성중',
}

export interface SentenceState {
  time?: number;
  totalCount: number;
  sentences: Sentence[];
  sentenceHistory: SentenceHistory[];
  createSentence: CreateSentence | null;
  editSentence: Sentence | null;
}

export const initialState: SentenceState = {
  time: 0,
  totalCount: 0,
  sentences: [],
  sentenceHistory: [],
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
