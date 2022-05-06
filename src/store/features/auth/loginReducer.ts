import { createSlice } from '@reduxjs/toolkit';
import loginAction, { initialState } from './loginAction';

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: loginAction,
});

const { login, loginSubmit } = loginSlice.actions;

export const loginModule = {
  login,
  loginSubmit,
  selectLoginState: (state: any) => state.login,
};

export default loginSlice.reducer;
