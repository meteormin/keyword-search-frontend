import config from '../config';
import jwtDecode from 'jwt-decode';

const conf = config();

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  groupId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TokenInfo {
  exp: number;
  id: number;
}

export interface AccessToken {
  token: string;
  tokenType?: string;
}

export interface Tokens {
  accessToken: AccessToken;
  expiresIn?: number;
  refreshToken?: string;
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

export const setToken = (token: Tokens) => {
  window.localStorage.setItem(conf.auth.tokenKey, token.accessToken.token);
  window.localStorage.setItem(
    conf.auth.tokenKey + '_type',
    token.accessToken.tokenType || '',
  );
  window.localStorage.setItem(
    conf.auth.tokenKey + '_expires_in',
    token.expiresIn?.toString() || '',
  );
};

export const getToken = (): Tokens | null => {
  let token: Tokens | null = null;
  if (conf.auth.tokenKey) {
    token = {
      accessToken: {
        token: window.localStorage.getItem(conf.auth.tokenKey) || '',
        tokenType:
          window.localStorage.getItem(conf.auth.tokenKey + '_type') ||
          undefined,
      },
      expiresIn: window.localStorage.getItem(conf.auth.tokenKey + '_expires_in')
        ? parseInt(
            window.localStorage.getItem(conf.auth.tokenKey + '_expires_in') ||
              '0',
          )
        : undefined,
      refreshToken: getRefresh() || '',
    };
  }
  return token || null;
};

export const setRefresh = (refresh: string) => {
  window.localStorage.setItem(conf.auth.refreshKey, refresh);
};

export const getRefresh = () => {
  return window.localStorage.getItem(conf.auth.refreshKey);
};

export const logout = (): void => {
  window.localStorage.clear();
};

export const isLogin = (): boolean => {
  return (
    user() != null && tokenInfo(getToken()?.accessToken.token as string) != null
  );
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
