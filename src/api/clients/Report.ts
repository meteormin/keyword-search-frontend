import BaseClient from 'api/base/BaseClient';
import { Reportable } from 'api/interfaces/Report';
import { Reporter } from 'api/interfaces/Report';
import { ApiResponse } from 'api/base/ApiClient';

class ReportClient extends BaseClient implements Reporter {
  report = async (r: Reportable): Promise<ApiResponse> => {
    return this._client.get('', r);
  };
}

export default ReportClient;
