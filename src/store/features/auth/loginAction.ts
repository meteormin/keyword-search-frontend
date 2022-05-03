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
  setLoginId: (state: LoginState, action: PayloadAction<any>) => {
    state.id = action.payload;
  },
  setLoginPass: (state: LoginState, action: PayloadAction<any>) => {
    state.password = action.payload;
  },
  login: (state: LoginState, action: PayloadAction<any>) => {
    state.token = action.payload.token;
    state.user = action.payload.user;

    if (state.token != null) {
      auth.setToken(state.token);
    }

    if (state.user != null) {
      auth.setUser(state.user);
    }
  },
  loginSubmit: (state: LoginState, action: PayloadAction<any>) => {
    state.id = action.payload.id;
    state.password = action.payload.password;
  },
};
