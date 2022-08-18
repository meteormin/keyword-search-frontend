import { SearchState } from '../../../pages/users/UsersPage';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  User,
  PatchUser,
  PostUser,
} from '../../../utils/nia153/interfaces/user';

import {
  Group,
  PostGroup,
  PatchGroup,
} from '../../../utils/nia153/interfaces/group';

export interface UsersState {
  method: string | null;
  currentGroup: Group;
  editGroup?: Group;
  search: SearchState;
  groups: Group[];
  users: User[];
  editUser?: User;
  postGroup?: Group | PostGroup | PatchGroup;
  postUser?: User | PostUser | PatchUser;
  updateGroupPerm: PatchGroup;
  getGroupId?: number;
  editGroupId?: number;
  editUserId?: number;
}

export const initialState: UsersState = {
  method: null,
  currentGroup: { id: 0, code: '', name: '' },
  search: { loginId: '', name: '', permission: '', groupId: '' },
  groups: [],
  users: [],
  updateGroupPerm: { id: 0, name: '' },
};

const userAction = {
  searchUser: (state: UsersState, action: PayloadAction<SearchState>) => {
    state.search = action.payload;
    state.users = [];
  },
  getGroups: (state: UsersState) => {
    state.groups = [];
  },

  getUsersByGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.currentGroup = action.payload;
    state.users = [];
  },

  getGroup: (state: UsersState, action: PayloadAction<number>) => {
    state.currentGroup.id = action.payload;
  },

  setGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.currentGroup = action.payload;
  },

  getEditGroup: (state: UsersState, action: PayloadAction<number>) => {
    state.editGroup = {
      id: action.payload,
      name: '',
      code: '',
    };
  },

  setEditGroup: (state: UsersState, action: PayloadAction<Group>) => {
    state.editGroup = action.payload;
  },

  getEditUser: (state: UsersState, action: PayloadAction<number>) => {
    state.editUser = {
      id: action.payload,
      name: '',
      loginId: '',
      userType: '',
      email: null,
      age: null,
      gender: null,
      group: { id: 0, code: '', name: '' },
      createdAt: null,
      updatedAt: null,
    };
  },
  setEditUser: (state: UsersState, action: PayloadAction<User>) => {
    state.editUser = action.payload;
  },
  setGroups: (state: UsersState, action: PayloadAction<Group[]>) => {
    state.groups = action.payload;
  },
  setUsers: (state: UsersState, action: PayloadAction<User[]>) => {
    state.users = action.payload;
  },
  saveGroup: (
    state: UsersState,
    action: PayloadAction<PostGroup | PatchGroup>,
  ) => {
    state.postGroup = action.payload;
  },
  saveUser: (
    state: UsersState,
    action: PayloadAction<PatchUser | PostUser>,
  ) => {
    state.postUser = action.payload;
  },
  resetPassword: (state: UsersState, action: PayloadAction<number>) => {
    state.method = 'resetPassword';
  },
  updatePassword: (state: UsersState, action: PayloadAction<string>) => {
    state.method = 'updatePassword';
  },
};

export default userAction;
