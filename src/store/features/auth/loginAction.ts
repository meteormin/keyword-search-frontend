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
  login: (
    state: LoginState,
    action: PayloadAction<{ token: string; user: LoginUser }>,
  ) => {
    state.token = action.payload.token;
    state.user = action.payload.user;

    if (state.user != null && state.token != null) {
      auth.setUser(state.user);
      auth.setToken(state.token);
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
};

export default loginAction;
