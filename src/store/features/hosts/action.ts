import { Host } from 'api/interfaces/Hosts';
import { PayloadAction } from '@reduxjs/toolkit';
import { Page } from 'api/interfaces/Common';
import {
  CreateHost,
  GetList,
  GetSearch,
  PatchHost,
  UpdateHost,
} from 'api/clients/Hosts';

export interface HostState {
  selectId: number | null;
  list: GetList | null;
  search: GetSearch | null;
  create: CreateHost | null;
  update: UpdateHost | null;
  patch: PatchHost | null;
  select: Host | null;
  page: Page | null;
}

export const initialState: HostState = {
  selectId: null,
  list: null,
  search: null,
  create: null,
  update: null,
  patch: null,
  select: null,
  page: null,
};

const action = {
  setSelectId: (state: HostState, action: PayloadAction<number | null>) => {
    state.selectId = action.payload;
  },
  setList: (state: HostState, action: PayloadAction<GetList>) => {
    state.list = action.payload;
  },
  setSearch: (state: HostState, action: PayloadAction<GetSearch>) => {
    state.search = action.payload;
  },
  setCreate: (state: HostState, action: PayloadAction<CreateHost | null>) => {
    state.create = action.payload;
  },
  setUpdate: (state: HostState, action: PayloadAction<UpdateHost | null>) => {
    state.update = action.payload;
  },
  setPatch: (state: HostState, action: PayloadAction<PatchHost | null>) => {
    state.patch = action.payload;
  },
  setSelect: (state: HostState, action: PayloadAction<Host | null>) => {
    state.select = action.payload;
  },

  // api req
  getList: (state: HostState, action: PayloadAction<{ page: Page }>) => {
    state.page = action.payload.page;
    state.list = null;
  },
  getSearch: (
    state: HostState,
    action: PayloadAction<{ hostId: number; page: Page }>,
  ) => {
    state.page = action.payload.page;
    state.search = null;
  },
  create: (state: HostState, action: PayloadAction<CreateHost>) => {
    state.create = action.payload;
  },
  update: (
    state: HostState,
    action: PayloadAction<{ id: number; host: UpdateHost }>,
  ) => {
    state.selectId = action.payload.id;
    state.update = action.payload.host;
  },
  patch: (
    state: HostState,
    action: PayloadAction<{ id: number; host: PatchHost }>,
  ) => {
    state.selectId = action.payload.id;
    state.patch = action.payload.host;
  },
  delete: (state: HostState, action: PayloadAction<number>) => {
    state.selectId = action.payload;
  },
  find: (state: HostState, action: PayloadAction<number>) => {
    state.selectId = action.payload;
  },
};
export default action;
