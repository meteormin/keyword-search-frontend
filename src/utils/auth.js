import config from '../config';

const conf = config();

export const setUser = (user) => {
  window.localStorage.setItem(conf.auth.userKey, user);
};

export const user = () => {
  return window.localStorage.getItem(conf.auth.userKey);
};

export const setToken = (token) => {
  window.localStorage.setItem(conf.auth.tokenKey, token);
};

export const getToken = () => {
  return window.localStorage.getItem(conf.auth.tokenKey);
};

export const isLogin = () => {
  return user() != null;
};
