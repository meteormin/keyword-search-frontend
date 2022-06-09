import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';

class Auth extends BaseClient {
  static readonly prefix = '/api/v1';

  constructor(client: ApiClient) {
    super(client);
  }

  login = async (id: string, password: string): Promise<ApiResponse> => {
    return await this._client.post('/auth/login', {
      id: id,
      password: password,
    });
  };

  me = async (token: string): Promise<ApiResponse> => {
    return await this._client.withToken(token, 'bearer').get('/users/me');
  };
}

export default Auth;
