import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';
import { Reportable } from '../../../helpers';

class Report extends BaseClient {
  static readonly prefix = 'api/report';

  constructor(client: ApiClient) {
    super(client);
  }

  report = async (data: Reportable): Promise<ApiResponse> => {
    return await this._client.post('/', data);
  };
}

export default Report;
