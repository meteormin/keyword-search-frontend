import config from '../config';

const conf = config();

export const setUser = (user: object) => {
  window.localStorage.setItem(conf.auth.userKey, JSON.stringify(user));
};

export const user = (): object => {
  return JSON.parse(window.localStorage.getItem(conf.auth.userKey) || '{}');
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
