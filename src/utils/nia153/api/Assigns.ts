import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';

class Assigns extends BaseClient {
  static readonly prefix = 'api/assign';

  constructor(client: ApiClient) {
    super(client);
  }

  assign = async (assignType: string): Promise<ApiResponse> => {
    return await this._client.post(`/${assignType}`);
  };

  getExpiresAt = async (
    userType: string | null = null,
  ): Promise<ApiResponse> => {
    return await this._client.get(`/expires-at/${userType}`);
  };
}

export default Assigns;
