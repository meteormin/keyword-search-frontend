import { createSlice } from '@reduxjs/toolkit';
import usersAction, { initialState } from './usersAction';

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: usersAction,
});

export const { searchUser, getGroups, getUsersByGroup } = usersSlice.actions;
export const getUsersState = (state: any) => state.users;

export default usersSlice.reducer;
