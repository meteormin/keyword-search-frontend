import BaseClient from '../base/BaseClient';
import { ErrorResInterface } from '../base/ApiClient';

class RedirectClient extends BaseClient {
  static readonly prefix = '/api/redirect';
  public redirect = async (
    code: string,
  ): Promise<string | ErrorResInterface | null> => {
    const res = await this._client.get(`/${code}/url`);
    if (res.isSuccess) {
      const data = res.res?.data;
      return data.url as string;
    }

    return res.error;
  };
}

export default RedirectClient;
