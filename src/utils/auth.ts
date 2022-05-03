import config from '../config';

const conf = config();

export const setUser = (user: object) => {
  window.localStorage.setItem(conf.auth.userKey, JSON.stringify(user));
};

export const user = (): object | null => {
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

export const isLogin = (): boolean => {
  return user() != null;
};
