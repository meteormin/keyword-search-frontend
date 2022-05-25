import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchParameters {
  type?: number;
  userId?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isReplied?: boolean;
}

export enum QuestionDiv {
  CREATE = 'create',
  REVIEW = 'review',
  SCORE = 'score',
}

export interface QuestionUser {
  id: number;
  loginId: string;
  userType: string;
  name: string;
  updateAt: string;
  createAt: string;
}

export interface Questions {
  id: number;
  title: string;
  type: string;
  div: QuestionDiv;
  createdAt: string;
  repliedAt: string;
  userId: number;
  userLoginId: string;
  replyUserId: number;
  replyUserLoginId: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  div: QuestionDiv;
  type: string;
  reply: string;
  fileName: string;
  filePath: string;
  createdAt: string;
  repliedAt: string;
  edges: {
    user: QuestionUser;
    replyUser?: QuestionUser;
  };
}

export interface CreateQuestion {
  title: string;
  content: string;
  type: number;
  div: QuestionDiv;
  document: File;
}

export interface QuestionState {
  count: number;
  list: Questions[];
  edit: Question | null;
  create: CreateQuestion | null;
  search?: QuestionSearch;
}

export const initialState: QuestionState = {
  count: 0,
  list: [],
  edit: null,
  create: null,
};

export interface QuestionSearch {
  title?: string;
  type?: string;
  userId?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  isReplied?: boolean;
  limit: number;
  page: number;
}

const questionAction = {
  setCount: (state: QuestionState, action: PayloadAction<number>) => {
    state.count = action.payload;
  },
  getList: (state: QuestionState, action: PayloadAction<QuestionSearch>) => {
    state.search = action.payload;
  },
  setList: (state: QuestionState, action: PayloadAction<Questions[]>) => {
    state.list = action.payload;
  },
  getById: (state: QuestionState, action: PayloadAction<number>) => {
    state.edit = null;
  },
  setEdit: (state: QuestionState, action: PayloadAction<Question | null>) => {
    state.edit = action.payload;
  },
  create: (state: QuestionState, action: PayloadAction<CreateQuestion>) => {
    state.create = action.payload;
  },
  reply: (
    state: QuestionState,
    action: PayloadAction<{ questionId: number; content: string }>,
  ): void => {
    return;
  },
};

export default questionAction;
