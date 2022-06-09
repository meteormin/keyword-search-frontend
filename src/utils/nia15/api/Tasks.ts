import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';

class Tasks extends BaseClient {
  static readonly prefix = 'api/v1/tasks';

  constructor(client: ApiClient) {
    super(client);
  }

  async assign(search?: SearchParameter) {
    return await this._client.post('/assign', search);
  }

  async getTaskList(search?: SearchParameter) {
    return await this._client.get('/assigned', search);
  }

  async getTask(taskId: number) {
    return await this._client.get(`/${taskId}`);
  }

  async getExpiredAt() {
    return await this._client.get('/assign/expiredAt');
  }
}

export default Tasks;
