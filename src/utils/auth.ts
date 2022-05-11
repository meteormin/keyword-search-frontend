import config from '../config';

const conf = config();

export interface User {
  id: number;
  loginId: string;
  name: string;
  type: string;
  typeId: number;
  groupId: number;
  group: string;
}

export const setUser = (user: object) => {
  window.localStorage.setItem(conf.auth.userKey, JSON.stringify(user));
};

export const user = (): User | null => {
  let user;
  if (conf.auth.userKey) {
    user = window.localStorage.getItem(conf.auth.userKey) || null;
  }

  return user ? JSON.parse(user) : null;
};

export const setToken = (token: string) => {
  window.localStorage.setItem(conf.auth.tokenKey, token);
};

export const getToken = (): string | null => {
  return window.localStorage.getItem(conf.auth.tokenKey) || null;
};

export const logout = (): void => {
  window.localStorage.removeItem(conf.auth.tokenKey);
  window.localStorage.removeItem(conf.auth.userKey);
};

export const isLogin = (): boolean => {
  return user() != null;
};
