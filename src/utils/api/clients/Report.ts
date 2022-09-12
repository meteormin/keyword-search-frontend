import BaseClient from '../BaseClient';
import { Reportable } from '../../../helpers';
import { Reporter } from '../interfaces/Report';
import { ApiResponse } from '../ApiClient';

class Report extends BaseClient implements Reporter {
  report = async (r: Reportable): Promise<ApiResponse> => {
    return this._client.get('', r);
  };
}

export default Report;
