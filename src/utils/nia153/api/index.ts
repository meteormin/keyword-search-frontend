import { ApiClient, Token } from '../../ApiClient';
import BaseClient from '../../nia15/BaseClient';
import { api, auth } from '../../../helpers';

export const Clients = {};

interface ClientType<T> {
  new (client: ApiClient): T;

  readonly prefix: string;
}

function makeClient<T extends BaseClient>(client: ClientType<T>): T {
  const token = auth.getToken();
  let withToken: Token | undefined;
  if (token) {
    withToken = { token: token, tokenType: 'bearer' };
  }

  return new client(
    api({
      prefix: client.prefix,
      token: withToken,
    }),
  );
}

export default makeClient;
