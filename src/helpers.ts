import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config';
import HiddenByRole from './utils/HiddenByRole';
import Restricted from './utils/Restricted';
import Protected from './utils/Protected';
import { ApiClient } from './utils/ApiClient';

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

export const guard = {
  HiddenByRole,
  Restricted,
  Protected,
};
