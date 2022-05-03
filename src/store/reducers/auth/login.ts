import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../../helpers';

export interface LoginUser {
  id: number | string;
}

export interface LoginState {
  id: string | null;
  password: string | null;
  user: LoginUser | null;
  token: string | null;
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: null,
    password: null,
    user: null,
    token: null,
  },
  reducers: {
    setLoginId: (state: LoginState, action) => {
      state.id = action.payload;
    },
    setLoginPass: (state: LoginState, action) => {
      state.password = action.payload;
    },
    login: (state: LoginState, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      if (state.token != null) {
        auth.setToken(state.token);
      }

      if (state.user != null) {
        auth.setUser(state.user);
      }
    },
    loginSubmit: (state: LoginState, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
  },
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
