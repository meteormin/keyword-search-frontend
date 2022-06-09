import { PayloadAction } from '@reduxjs/toolkit';
import { Sentence } from '../../../utils/nia15/interfaces/sentences';
import {
  SentenceReview,
  CreateReview,
  Review,
} from '../../../utils/nia15/interfaces/reviews';

export interface ReviewState {
  time: string | null;
  totalCount: number;
  seq: number;
  reviews: Review[];
  sentences: Sentence[];
  assignSentence: Sentence | null;
  editReview: SentenceReview | null;
  createReview: CreateReview | null;
}

export const initialState: ReviewState = {
  time: null,
  totalCount: 0,
  seq: 1,
  reviews: [],
  sentences: [],
  assignSentence: null,
  editReview: null,
  createReview: null,
};

const reviewAction = {
  assign: (state: ReviewState, action: PayloadAction<number>) => {
    state.seq = action.payload;
  },
  setTime: (state: ReviewState, action: PayloadAction<string>) => {
    state.time = action.payload;
  },
  setTotalCount: (state: ReviewState, action: PayloadAction<number>) => {
    state.totalCount = action.payload;
  },
  getAssignList: (
    state: ReviewState,
    action: PayloadAction<{ seq: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.sentences = [];
  },
  setAssignList: (state: ReviewState, action: PayloadAction<Sentence[]>) => {
    state.sentences = action.payload;
  },
  getAssign: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; assignId: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.assignSentence = null;
  },
  getExpiredAt: (
    state: ReviewState,
    action: PayloadAction<{ seq: number }>,
  ) => {
    state.time = null;
    state.seq = action.payload.seq;
  },
  setAssign: (state: ReviewState, action: PayloadAction<Sentence | null>) => {
    state.assignSentence = action.payload;
  },
  getReviewList: (
    state: ReviewState,
    action: PayloadAction<{ seq: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.reviews = [];
  },
  setReviewList: (state: ReviewState, action: PayloadAction<Review[]>) => {
    state.reviews = action.payload;
  },
  getReview: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; id: number }>,
  ) => {
    state.editReview = null;
  },
  setReview: (
    state: ReviewState,
    action: PayloadAction<SentenceReview | null>,
  ) => {
    state.editReview = action.payload;
  },
  createReview: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; review: CreateReview }>,
  ) => {
    state.seq = action.payload.seq;
    state.createReview = action.payload.review;
  },
};
export default reviewAction;
