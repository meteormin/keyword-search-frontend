import { PayloadAction } from '@reduxjs/toolkit';
import { SearchParameter } from '../../../utils/nia15/interfaces/search';

export interface SearchState {
  parameters: SearchParameter | null;
}

export const initialState: SearchState = {
  parameters: null,
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
};

export default searchAction;
