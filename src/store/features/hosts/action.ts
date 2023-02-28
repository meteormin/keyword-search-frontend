import { Host } from 'api/interfaces/Hosts';
import { PayloadAction } from '@reduxjs/toolkit';
import { Page } from 'api/interfaces/Common';
import {
  CreateHost,
  GetList,
  GetSearch,
  GetSearchDescriptions,
  GetSubjects,
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
  page: Page;
  subjects: GetSubjects | null;
  searchDescriptions: GetSearchDescriptions | null;
}

export const initialState: HostState = {
  selectId: null,
  list: null,
  search: null,
  create: null,
  update: null,
  patch: null,
  select: null,
  page: {
    page: 1,
    pageSize: 10,
  },
  subjects: null,
  searchDescriptions: null,
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
  setSubjects: (state: HostState, action: PayloadAction<GetSubjects>) => {
    state.subjects = action.payload;
  },
  setSearchDescriptions: (
    state: HostState,
    action: PayloadAction<GetSearchDescriptions>,
  ) => {
    state.searchDescriptions = action.payload;
  },
  setPage: (state: HostState, action: PayloadAction<Page>) => {
    state.page = action.payload;
  },

  // api req
  getList: (state: HostState, action: PayloadAction<{ page: Page }>) => {
    state.page = action.payload.page;
    state.list = null;
  },
  getSubjects: (state: HostState, action: PayloadAction<{ page: Page }>) => {
    state.page = action.payload.page;
    state.subjects = null;
  },
  getSearch: (
    state: HostState,
    action: PayloadAction<{ hostId: number; page: Page }>,
  ) => {
    state.page = action.payload.page;
    state.search = null;
  },
  getSearchDescriptions: (
    state: HostState,
    action: PayloadAction<{ hostId: number; page: Page }>,
  ) => {
    state.page = action.payload.page;
    state.searchDescriptions = null;
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
    state.select = null;
  },
};
export default action;
