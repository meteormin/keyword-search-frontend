import config from '../config';

export const user = () => {
  return window.localStorage.getItem(config().auth.userKey);
};

export const getToken = () => {
  return window.localStorage.getItem(config().auth.tokenKey);
};

export const isLogin = () => {
  return user() != null;
};