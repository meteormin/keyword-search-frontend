import { SearchState } from '../../../pages/users/UsersPage';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Group {
  id: number;
  code: string;
  name: string;
  edges?: {
    users?: User[];
    permissions?: Permission[];
  };
}

export interface User {
  id: number;
  loginId: string;
  name: string;
  userType: string;
  groupId: number;
  groupCode: string;
  groupName: string;
  createdAt: string;
  edges?: object;
}

export interface Permission {
  id: number;
  name: string;
  edges?: object;
}

export interface CreateUser {
  loginId: string;
  name: string;
  userType: string;
}

export interface CreateGroup {
  name: string;
}

export interface UpdateGroupPerm {
  id?: number;
  permissions: number[];
}

export interface UsersState {
  currentGroup: Group;
  editGroup?: Group;
  permList: Permission[];
  search: SearchState;
  groups: Group[];
  users: User[];
  createGroup?: Group;
  createUser?: User;
  updateGroupPerm: UpdateGroupPerm;
  getGroupId?: number;
  editGroupId?: number;
}

export const initialState: UsersState = {
  currentGroup: { id: 0, code: '', name: '' },
  permList: [],
  search: { id: '', name: '', permission: '' },
  groups: [],
  users: [],
  updateGroupPerm: { permissions: [] },
};

const usersAction = {
  searchUser: (state: UsersState, action: PayloadAction<SearchState>) => {
    state.search = action.payload;
    state.users = [];
  },
  getGroups: (state: UsersState) => {
    state.groups = [];
  },
  getPermList: (state: UsersState) => {
    state.permList = [];
  },
  setPermList: (state: UsersState, action: PayloadAction<Permission[]>) => {
    state.permList = action.payload;
  },
  getUsersByGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.currentGroup = action.payload;
    state.users = [];
  },
  getGroup: (state: UsersState, action: PayloadAction<number>) => {
    state.getGroupId = action.payload;
  },
  setGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.currentGroup = action.payload;
  },
  getEditGroup: (state: UsersState, action: PayloadAction<number>) => {
    state.editGroupId = action.payload;
  },
  setEditGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.editGroup = action.payload;
  },
  setGroups: (state: UsersState, action: PayloadAction<Group[]>) => {
    state.groups = action.payload;
  },
  setUsers: (state: UsersState, action: PayloadAction<User[]>) => {
    state.users = action.payload;
  },
  setGroupPermission: (
    state: UsersState,
    action: PayloadAction<UpdateGroupPerm>,
  ) => {
    state.updateGroupPerm = action.payload;
  },
};
export default usersAction;
