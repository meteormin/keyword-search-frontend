import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config';
import HiddenByRole from './utils/HiddenByRole';
import Restricted from './utils/Restricted';
import Protected from './utils/Protected';
import { ApiClient, ApiResponse } from './utils/ApiClient';
import moment from 'moment';
import 'moment/locale/ko';

export const config = Config();
export const auth = Auth;

/**
 * @param {string|null} host
 * @returns {ApiClient}
 */
export const api = (host?: string): ApiClient => {
  return host
    ? new Api.ApiClient(host)
    : new Api.ApiClient(config.api.host as string);
};

export const apiResponse = (res: ApiResponse) => {
  if (res.isSuccess && res.res.status) {
    return res.res.data;
  }

  if (res.res.hasOwnProperty('fields')) {
    return res.res.fields;
  } else {
    return res.res.msg;
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
