import { createSlice } from '@reduxjs/toolkit';
import usersAction, { initialState, UsersState } from './usersAction';

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: usersAction,
});

export const {
  searchUser,
  getGroups,
  getUsersByGroup,
  setGroups,
  setUsers,
  getGroup,
  setGroup,
  setGroupPermission,
  getEditGroup,
  setEditGroup,
  getPermList,
  setPermList,
  getEditUser,
  setEditUser,
  saveGroup,
  saveUser,
  resetPassword,
} = usersSlice.actions;
export const getUsersState = (state: any): UsersState => state.users;

export default usersSlice.reducer;
