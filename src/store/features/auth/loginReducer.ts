import { createSlice } from '@reduxjs/toolkit';
import loginAction, { initialState } from './loginAction';

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: loginAction,
});

const { setLoginId, setLoginPass, login, loginSubmit } = loginSlice.actions;

export const loginModule = {
  setLoginId,
  setLoginPass,
  login,
  loginSubmit,
  selectLoginState: (state: any) => state.login,
};

export default loginSlice.reducer;
