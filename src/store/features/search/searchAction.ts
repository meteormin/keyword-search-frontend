import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchParameter {
  limit?: number;
  page?: number;
  reviewStatus?: ReviewStatus;
  createdAtStart?: string;
  createdAtEnd?: string;
  reviewedAtStart?: string;
  reviewedAtEnd?: string;
  rejectReason?: number;
  createStatus?: CreateStatus;
  refID?: number;
  domain?: string;
  sentenceGroupName?: string;
  sentenceUserID?: string;
  review1UserID?: string;
  review2UserID?: string;
}

export enum CreateStatus {
  WAITING = 'WAITING',
  CREATED = 'CREATED',
}

export enum ReviewStatus {
  NONE,
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
    if (state.parameters == null) {
      state.parameters = action.payload;
    } else {
      state.parameters = Object.assign(state.parameters, action.payload);
    }
  },
};

export default searchAction;
