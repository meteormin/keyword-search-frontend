import { PayloadAction } from '@reduxjs/toolkit';
import { ReviewResult } from '../../../components/common/WorkSpace';

export interface SearchParameter {
  reviewStatus?: ReviewStatus;
  createdAtStart?: string;
  createdAtEnd?: string;
  reviewedAtStart?: string;
  reviewedAtEnd?: string;
  rejectReason?: number;
}

export enum ReviewStatus {
  WAITING = 'WAITING',
  REJECT1 = 'REJECT1',
  PASS1 = 'PASS1',
  REJECT2 = 'REJECT2',
  PASS2 = 'PASS2',
}

export interface SearchState {
  parameters: SearchParameter | null;
}

export const initialState: SearchState = {
  parameters: null,
};

const searchAction = {
  search: (state: SearchState, action: PayloadAction<SearchParameter>) => {
    state.parameters = action.payload;
  },
};

export default searchAction;
