import { createSlice } from '@reduxjs/toolkit';
import userAction, { initialState, UsersState } from './userAction';

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: userAction,
});

export const actions = usersSlice.actions;
export const getUsersState = (state: any): UsersState => state.users;

export default usersSlice.reducer;
