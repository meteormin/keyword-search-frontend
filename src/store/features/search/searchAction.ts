import { PayloadAction } from '@reduxjs/toolkit';
import {
  SearchParameter,
  StatsSearchParameter,
} from '../../../utils/nia15/interfaces/search';

export interface SearchState {
  parameters: SearchParameter | null;
  statsParameter: StatsSearchParameter | null;
}

export const initialState: SearchState = {
  parameters: null,
  statsParameter: null,
};

const searchAction = {
  search: (
    state: SearchState,
    action: PayloadAction<SearchParameter | null>,
  ) => {
    if (state.parameters == null || action.payload == null) {
      state.parameters = action.payload;
    } else {
      state.parameters = Object.assign(state.parameters, action.payload);
    }
  },
  searchForStats: (
    state: SearchState,
    action: PayloadAction<StatsSearchParameter | null>,
  ) => {
    if (state.statsParameter == null || action.payload == null) {
      state.statsParameter = action.payload;
    } else {
      state.statsParameter = Object.assign(
        state.statsParameter,
        action.payload,
      );
    }
  },
};

export default searchAction;
