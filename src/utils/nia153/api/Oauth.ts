import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';
import { PasswordGrantType, RefreshTokenGrantType } from '../interfaces/oauth';

class Oauth extends BaseClient {
  static readonly prefix = 'oauth';

  constructor(client: ApiClient) {
    super(client);
  }

  token = async (body: PasswordGrantType): Promise<ApiResponse> => {
    return await this._client.post('/token', body);
  };

  refreshToken = async (body: RefreshTokenGrantType): Promise<ApiResponse> => {
    return await this._client.post('/token', body);
  };
}

export default Oauth;
