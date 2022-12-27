import BaseClient from 'api/base/BaseClient';
import { Reportable } from 'api/interfaces/Report';
import { Reporter } from 'api/interfaces/Report';
import { ApiResponse } from 'api/base/ApiClient';

class Report extends BaseClient implements Reporter {
  report = async (r: Reportable): Promise<ApiResponse> => {
    return this._client.get('', r);
  };
}

export default Report;
