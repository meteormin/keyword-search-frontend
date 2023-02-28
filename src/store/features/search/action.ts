import { Search } from 'api/interfaces/Search';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateSearch, PatchSearch, UpdateSearch } from 'api/clients/Search';
import { number } from 'prop-types';

export interface SearchState {
  selectId: number | null;
  create: CreateSearch | null;
  update: UpdateSearch | null;
  patch: PatchSearch | null;
}

export const initialState: SearchState = {
  selectId: null,
  create: null,
  update: null,
  patch: null,
};

const action = {
  create: (state: SearchState, action: PayloadAction<CreateSearch>) => {
    state.create = action.payload;
  },
  update: (
    state: SearchState,
    action: PayloadAction<{ id: number; update: UpdateSearch }>,
  ) => {
    state.selectId = action.payload.id;
    state.update = action.payload.update;
  },
  patch: (
    state: SearchState,
    action: PayloadAction<{ id: number; patch: PatchSearch }>,
  ) => {
    state.selectId = action.payload.id;
    state.patch = action.payload.patch;
  },
  delete: (state: SearchState, action: PayloadAction<number>) => {
    state.selectId = action.payload;
  },
};

export default action;
