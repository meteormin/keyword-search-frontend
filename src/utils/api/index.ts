import ApiClient, { Token } from './ApiClient';
import BaseClient from './BaseClient';
import { api, auth } from '../../helpers';
import Report from './clients/Report';

export const Clients = {
  Report,
};

interface ClientType<T> {
  new (client: ApiClient): T;

  readonly prefix: string;
}

function makeClient<T extends BaseClient>(client: ClientType<T>): T {
  const token = auth.getToken();
  let withToken: Token | undefined;
  if (token) {
    withToken = {
      token: token.accessToken,
      tokenType: token?.tokenType || null,
    };
  }

  return new client(
    api({
      prefix: client.prefix,
      token: withToken,
    }),
  );
}

export default makeClient;
