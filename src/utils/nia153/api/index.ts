import { ApiClient, Token } from '../../ApiClient';
import BaseClient from '../../nia153/BaseClient';
import { api, auth } from '../../../helpers';
import Assigns from './Assigns';
import Groups from './Groups';
import Oauth from './Oauth';
import Scores from './Scores';
import Users from './Users';
import Report from './Report';
import Questions from './Questions';

export const Clients = {
  Assigns,
  Groups,
  Oauth,
  Scores,
  Users,
  Report,
  Questions,
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
