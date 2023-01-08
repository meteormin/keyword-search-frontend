import { SearchTableSchema } from './schema';
import { config, auth } from 'helpers';

const host = config.api.default.host;
const redirectPath = '/api/short-url';
const token = auth.getToken()?.accessToken.token || '';
const makeRedirectUrl = (url: string, code: string) =>
  url + `/${code}/redirect?token=${token}`;

export const openWindows = (shortUrl: string) => {
  const url = makeRedirectUrl(host + redirectPath, shortUrl);

  window.open(url, '_blank');
};

export const defaultOnClick = (r: SearchTableSchema) => {
  openWindows(r.shortUrl);
};
