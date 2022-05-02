import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config';

export const config = Config();
export const auth = Auth;

/**
 * @param {string|null} host
 * @returns {ApiClient}
 */
export const api = (host = null) => {
  return host ? new Api.ApiClient(host) : new Api.ApiClient(config.api.host);
};
