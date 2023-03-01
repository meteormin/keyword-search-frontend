import BaseClient from '../base/BaseClient';
import { ApiResponse, ErrorResInterface } from '../base/ApiClient';

class RedirectClient extends BaseClient {
  static readonly prefix = '/api/redirect';
  public redirect = async (
    code: string,
  ): Promise<ApiResponse<string | ErrorResInterface>> => {
    const res = await this._client.get(`/${code}/url`);
    if (res.isSuccess) {
      const data = res?.data;
      res.data = data.url as string;
    }
    return res;
  };
}

export default RedirectClient;
