import { auth } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../utils/auth';

export interface LoginUser extends User {
  id: number;
  loginId: string;
  email: string;
  name: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginState {
  id: string | null;
  password: string | null;
  user: LoginUser | null;
  token: string | null;
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
      token: { Access: string; Refresh: string };
      user: LoginUser;
    }>,
  ) => {
    state.token = action.payload.token.Access;
    state.user = action.payload.user;

    if (state.user != null && state.token != null) {
      auth.setUser(state.user);
      auth.setToken(state.token);
      auth.setRefresh(action.payload.token.Refresh);
    }
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
  },
  refresh: (state: LoginState, action: PayloadAction<string>) => {
    state.token = null;
    state.user = null;
  },
};

export default loginAction;
