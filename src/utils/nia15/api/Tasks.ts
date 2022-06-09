import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';

class Tasks extends BaseClient {
  static readonly prefix = 'api/v1/tasks';

  constructor(client: ApiClient) {
    super(client);
  }

  assign = async (search?: SearchParameter) => {
    return await this._client.post('/assign', search);
  };

  getTaskList = async (search?: SearchParameter) => {
    return await this._client.get('/assigned', search);
  };

  getTask = async (taskId: number) => {
    return await this._client.get(`/${taskId}`);
  };

  getExpiredAt = async () => {
    return await this._client.get('/assign/expiredAt');
  };
}

export default Tasks;
