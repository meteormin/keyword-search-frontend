import { createSlice } from '@reduxjs/toolkit';
import loginAction, { initialState } from './loginAction';

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: loginAction,
});

export const { login, loginSubmit, logout } = loginSlice.actions;
export const getLoginState = (state: any) => state.login;

export default loginSlice.reducer;
