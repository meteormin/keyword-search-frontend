import config from '../config';
import jwtDecode from 'jwt-decode';
import { auth, date } from '../helpers';
import { UserType } from '../config/UserType';

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
  permission: string;
  userType: string;
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

export const getJobTimeAt = (userType: UserType) => {
  const now = date();
  const expiredAt = window.localStorage.getItem(
    userType + conf.auth.jobExpiredAt,
  );

  if (expiredAt) {
    const leftTime = date(expiredAt).diff(now);
    console.log('left time', leftTime);
    if (leftTime >= 0) {
      return date(expiredAt);
    } else {
      window.localStorage.removeItem(userType + conf.auth.jobExpiredAt);
    }
  }

  return null;
};

export const setJobTimeAt = (userType: UserType, expiredAt: string) => {
  return window.localStorage.setItem(
    userType + conf.auth.jobExpiredAt,
    expiredAt,
  );
};
