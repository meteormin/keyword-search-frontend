import { PayloadAction } from '@reduxjs/toolkit';
import {
  Search, StatsSearch
} from '../../../utils/nia153/interfaces/search';

export interface SearchState {
  parameters: Search | null;
  statsParameter: StatsSearch | null;
}

export const initialState: SearchState = {
  parameters: null,
  statsParameter: null,
};

const searchAction = {
  search: (
    state: SearchState,
    action: PayloadAction<Search | null>,
  ) => {
    if (state.parameters == null || action.payload == null) {
      state.parameters = action.payload;
    } else {
      state.parameters = Object.assign(state.parameters, action.payload);
    }
  },
  searchForStats: (
    state: SearchState,
    action: PayloadAction<StatsSearch | null>,
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
