import { PayloadAction } from '@reduxjs/toolkit';
import { CreateSearch, PatchSearch, UpdateSearch } from 'api/clients/Search';

export interface PreviewImage {
  filename: string;
  url: string;
}

export interface SearchState {
  selectId: number | null;
  create: CreateSearch | null;
  update: UpdateSearch | null;
  patch: PatchSearch | null;
  previewImage: PreviewImage | null;
}

export const initialState: SearchState = {
  selectId: null,
  create: null,
  update: null,
  patch: null,
  previewImage: null,
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
  uploadImage: (
    state: SearchState,
    action: PayloadAction<{ id: number; file: PreviewImage }>,
  ) => {
    state.previewImage = action.payload.file;
    state.selectId = action.payload.id;
  },
  getImage: (state: SearchState, action: PayloadAction<number>) => {
    state.selectId = action.payload;
  },
  setPreviewImage: (
    state: SearchState,
    action: PayloadAction<PreviewImage>,
  ) => {
    state.previewImage = action.payload;
  },
};

export default action;
