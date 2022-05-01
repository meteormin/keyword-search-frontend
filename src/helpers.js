import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config/index';

export const config = Config();
export const auth = Auth;
export const api = new Api.ApiClient(config.api.host);
