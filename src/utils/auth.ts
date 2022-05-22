import config from '../config';
import jwtDecode from 'jwt-decode';

const conf = config();

export interface User {
  id: number;
  name: string;
  email: string;
  loginId: string;
  userType: string;
  groupId: number;
  groupCode: string;
  groupName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenInfo {
  exp: number;
  group: number[];
  id: number;
  permission: string[];
}

export const setUser = (user: object) => {
  window.localStorage.setItem(conf.auth.userKey, JSON.stringify(user));
};

export const user = (): User | null => {
  let user;
  if (conf.auth.userKey) {
    user = window.localStorage.getItem(conf.auth.userKey) || null;
  }
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const setToken = (token: string) => {
  window.localStorage.setItem(conf.auth.tokenKey, token);
};

export const getToken = (): string | null => {
  return window.localStorage.getItem(conf.auth.tokenKey) || null;
};

export const setRefresh = (refresh: string) => {
  window.localStorage.setItem(conf.auth.refreshKey, refresh);
};

export const getRefresh = () => {
  window.localStorage.getItem(conf.auth.refreshKey);
};

export const logout = (): void => {
  window.localStorage.removeItem(conf.auth.tokenKey);
  window.localStorage.removeItem(conf.auth.userKey);
};

export const isLogin = (): boolean => {
  return user() != null && tokenInfo(getToken() as string) != null;
};

export const tokenInfo = (token: string): TokenInfo | null => {
  if (token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};
