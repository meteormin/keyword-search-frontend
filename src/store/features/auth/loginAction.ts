import { auth } from 'helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { Tokens, User } from 'utils/auth';

export interface LoginState {
  id: string | null;
  password: string | null;
  user: User | null;
  token: Tokens | null;
}

export const initialState: LoginState = {
  id: null,
  password: null,
  user: null,
  token: null,
};

const loginAction = {
  changeId: (state: LoginState, action: PayloadAction<string>) => {
    state.id = action.payload;
  },
  changePass: (state: LoginState, action: PayloadAction<string>) => {
    state.password = action.payload;
  },
  login: (
    state: LoginState,
    action: PayloadAction<{
      token: Tokens;
      user: User;
    }>,
  ) => {
    state.token = action.payload.token;
    state.user = action.payload.user;

    if (state.user && state.token) {
      auth.setUser(state.user);
      auth.setToken(state.token);
      if (action.payload.token.refreshToken) {
        auth.setRefresh(action.payload.token?.refreshToken);
      }
    }

    window.location.href = '/';
  },
  loginSubmit: (
    state: LoginState,
    action: PayloadAction<{ id: string; password: string }>,
  ) => {
    state.id = action.payload.id;
    state.password = action.payload.password;
  },
  logout: (state: LoginState) => {
    state.token = null;
    state.user = null;

    auth.logout();
    window.location.href = '/login';
  },
  refresh: (state: LoginState, action: PayloadAction<string>) => {
    state.token = null;
    state.user = null;
  },
};

export default loginAction;
