import Auth from './Auth';
import BaseClient from '../BaseClient';
import { api, auth } from '../../../helpers';
import { ApiClient, Token } from '../../ApiClient';
import Questions from './Questions';
import Reviews from './Reviews';
import Sentences from './Sentences';
import Users from './Users';
import Tasks from './Tasks';
import Statics from './Statics';

export const Clients = {
  Auth,
  Questions,
  Reviews,
  Tasks,
  Sentences,
  Users,
  Statics,
};

interface ClientType<T> {
  new (client: ApiClient): T;

  readonly prefix: string;
}

function newClient<T extends BaseClient>(client: ClientType<T>): T {
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

export default newClient;
