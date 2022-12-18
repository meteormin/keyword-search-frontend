import BaseClient from 'utils/api/BaseClient';
import { Reportable } from 'utils/api/interfaces/Report';
import { Reporter } from 'utils/api/interfaces/Report';
import { ApiResponse } from 'utils/api/ApiClient';

class Report extends BaseClient implements Reporter {
  report = async (r: Reportable): Promise<ApiResponse> => {
    return this._client.get('', r);
  };
}

export default Report;
