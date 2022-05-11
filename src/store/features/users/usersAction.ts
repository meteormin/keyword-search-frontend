import { Search } from '../../../pages/users/UsersPage';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Group {
  id: number;
  code: string;
  name: string;
}

export interface UsersState {
  currentGroup: string;
  search: Search;
  groups: Group[];
  users: CreateUser[];
}

export interface CreateUser {
  loginId: string;
  password: string;
  userType: string;
  groupId: number;
  groupCode: string;
}

export const initialState: UsersState = {
  currentGroup: '',
  search: { id: '', name: '', permission: '' },
  groups: [],
  users: [],
};

const usersAction = {
  searchUser: (state: UsersState, action: PayloadAction<Search>) => {
    state.search = action.payload;
    state.users = [];
  },
  getGroups: (state: UsersState) => {
    state.groups = [];
  },
  getUsersByGroup: (state: UsersState, action: PayloadAction<string>) => {
    state.currentGroup = action.payload;
    state.users = [];
  },
};

export default usersAction;
