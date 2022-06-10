import { PayloadAction } from '@reduxjs/toolkit';
import {
  Question,
  Questions,
  CreateQuestion,
  QuestionSearch,
} from '../../../utils/nia15/interfaces/questions';

export interface QuestionState {
  isAdmin: boolean;
  count: number;
  list: Questions[];
  edit: Question | null;
  create: CreateQuestion | null;
  search?: QuestionSearch;
  file?: any;
}

export const initialState: QuestionState = {
  isAdmin: false,
  count: 0,
  list: [],
  edit: null,
  create: null,
  file: null,
};

const questionAction = {
  isAdmin: (state: QuestionState, action: PayloadAction<boolean>) => {
    state.isAdmin = action.payload;
  },
  search: (state: QuestionState, action: PayloadAction<QuestionSearch>) => {
    if (state.search == null) {
      state.search = action.payload;
    } else {
      state.search = Object.assign(state.search, action.payload);
    }
  },
  setCount: (state: QuestionState, action: PayloadAction<number>) => {
    state.count = action.payload;
  },
  getList: (state: QuestionState) => {
    state.list = [];
  },
  setList: (state: QuestionState, action: PayloadAction<Questions[]>) => {
    state.list = action.payload;
  },
  getById: (state: QuestionState, action: PayloadAction<number>) => {
    state.edit = null;
  },
  getFileById: (state: QuestionState, action: PayloadAction<number>) => {
    state.file = null;
  },
  setFile: (state: QuestionState, action: PayloadAction<any>) => {
    state.file = action.payload;
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
