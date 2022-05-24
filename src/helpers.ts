import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config';
import HiddenByRole from './utils/HiddenByRole';
import Restricted from './utils/Restricted';
import Protected from './utils/Protected';
import { ApiClient, ApiResponse, Token } from './utils/ApiClient';
import moment from 'moment';
import 'moment/locale/ko';
import Lang from './assets/lang';
import { AxiosRequestHeaders } from 'axios';
import * as Str from './utils/str';
import BaikalNlp from './utils/BaikalNlp';

export const config = Config();
export const auth = Auth;

export interface ApiConfig {
  host?: string | null;
  headers?: AxiosRequestHeaders;
  token?: Token;
}

/**
 * @param {ApiConfig} apiConfig
 * @returns {ApiClient}
 */
export const api = (apiConfig?: ApiConfig): ApiClient => {
  const client = apiConfig?.host
    ? new Api.ApiClient(apiConfig.host)
    : new Api.ApiClient(config.api.host as string);

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

export const apiResponse = (res: ApiResponse) => {
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

export const baikalNlp = new BaikalNlp(api({ host: config.baikalNlp.host }));
