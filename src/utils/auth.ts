import config from 'config';
import jwtDecode from 'jwt-decode';
import { auth, date } from '../helpers';
import { api } from '../api';
import { toCamel } from 'snake-camel';

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
  expiresIn: number;
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

const authCheck = (): boolean => {
  const token = auth.getToken()?.accessToken;

  if (token?.token) {
    let isValid = false;

    const tokenInfo = auth.tokenInfo(
      auth.getToken()?.accessToken.token as string,
    );

    if (tokenInfo) {
      const expAt = date.unix(tokenInfo.expiresIn);
      const now = date(new Date());
      const expTime = date.duration(expAt.diff(now));

      if (expTime.asSeconds() > 0) {
        isValid = true;
      }
    }

    if (!isValid) {
      api()
        .withToken(auth.getToken()?.accessToken.token as string, 'bearer')
        .get('api/auth/me')
        .then((res) => {
          if (res.isSuccess) {
            console.log('access_token is alive');
            return;
          }

          if (res.res && res.res.status == 401) {
            // refresh
            console.log('need refresh');
          }

          auth.logout();
          window.location.href = '/login';
        })
        .catch((reason) => {
          console.log('need refresh', reason);
          auth.logout();
          window.location.href = '/login';
        });
    }
    return isValid;
  }

  return false;
};

export const isLogin = (): boolean => {
  const isValid = authCheck();
  if (isValid) {
    return (
      user() != null &&
      tokenInfo(getToken()?.accessToken.token as string) != null
    );
  }

  return false;
};

export const tokenInfo = (token: string): TokenInfo | null => {
  if (token) {
    try {
      const tokenInfo = jwtDecode(token);
      if (tokenInfo != null) {
        return toCamel(tokenInfo) as TokenInfo;
      }

      return tokenInfo as null;
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};
