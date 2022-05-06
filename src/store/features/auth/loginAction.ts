import { auth } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';

export interface LoginUser {
  id: number | string;
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

export default {
  login: (state: LoginState, action: PayloadAction<any>) => {
    state.token = action.payload.token;
    state.user = action.payload.user;

    if (state.user != null && state.token != null) {
      auth.setUser(state.user);
      auth.setToken(state.token);
    }
  },
  loginSubmit: (state: LoginState, action: PayloadAction<any>) => {
    state.id = action.payload.id;
    state.password = action.payload.password;
  },
};
