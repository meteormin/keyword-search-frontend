import * as Auth from './utils/auth';
import Config from './config';
import HiddenByRole from './utils/HiddenByRole';
import Restricted from './utils/Restricted';
import Protected from './utils/Protected';
import ApiClient, {
  ApiResponse,
  ErrorResInterface,
  Token,
} from './utils/api/ApiClient';
import moment from 'moment';
import 'moment/locale/ko';
import Lang from './assets/lang';
import { AxiosRequestHeaders } from 'axios';
import * as Str from './utils/str';
import * as Arr from './utils/arr';
import { makePath } from './utils/str';
import { useEffect, useRef } from 'react';
import makeClient, { Clients } from './utils/api';

export const config = Config();
export const auth = Auth;

export interface ApiConfig {
  host?: string | null;
  prefix?: string | null;
  headers?: AxiosRequestHeaders;
  token?: Token;
}

/**
 * @param {ApiConfig} apiConfig
 * @returns {ApiClient}
 */
export const api = (apiConfig?: ApiConfig): ApiClient => {
  if (apiConfig?.prefix) {
    if (!apiConfig?.host) {
      apiConfig.host = config.api.default.host as string;
    }

    try {
      const url = new URL(apiConfig.host);
      apiConfig.host =
        url.protocol +
        '//' +
        makePath(url.host + url.pathname, apiConfig.prefix);
    } catch (error) {
      const url = new URL(window.location.href);
      apiConfig.host =
        url.protocol +
        '//' +
        makePath(url.host + apiConfig.host, apiConfig.prefix);
    }
  }

  if (apiConfig?.host) {
    try {
      const url = new URL(apiConfig.host);
      apiConfig.host = url.protocol + '//' + url.host + url.pathname;
    } catch (error) {
      const url = new URL(window.location.href);
      apiConfig.host = url.protocol + '//' + url.host + apiConfig.host;
    }
  }

  const client = apiConfig?.host
    ? new ApiClient(apiConfig.host)
    : new ApiClient(config.api.default.host as string);

  if (apiConfig) {
    if (apiConfig.headers) {
      client.withHeader(apiConfig.headers);
    }
    if (apiConfig.token) {
      client.withToken(
        apiConfig.token.token as string,
        apiConfig.token.tokenType as string,
      );
    }
  }

  return client;
};

export const apiResponse = (res: ApiResponse): any | ErrorResInterface => {
  if (res.isSuccess && res.res) {
    return res.res.data;
  }

  if (res.error) {
    return res.error;
  }
};

export const guard = {
  HiddenByRole,
  Restricted,
  Protected,
  handleByRole: (
    path: string,
    role: string,
    rules: { [key: string]: string[] },
  ) => {
    return path in rules[role];
  },
};

// moment.locale('ko');
export const date = moment;

export const lang = Lang();

export const str = Str;

export const arr = Arr;

export function usePrev<T>(value: T): T {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value as T;
  });

  return ref.current as T;
}

export interface Reportable {
  message: string;
  context: object;
}

export const reportError = async (
  r: Reportable,
): Promise<ApiResponse | null> => {
  try {
    console.log(r);
    const reportApi = makeClient(Clients.Report);
    return await reportApi.report(r);
  } catch (e) {
    console.error(e);
    return null;
  }
};
