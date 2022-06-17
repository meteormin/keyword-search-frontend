import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { StatsSearchParameter } from '../interfaces/search';

class Statics extends BaseClient {
  static readonly prefix = 'api/v1/statistic';

  public readonly task: Task;

  constructor(client: ApiClient) {
    super(client);
    this.task = new Task(client);
  }
}

class Task extends BaseClient {
  static readonly prefix = 'task';

  constructor(client: ApiClient) {
    super(client);
  }

  getTaskStats = async (searchParams?: StatsSearchParameter) => {
    return await this._client.get(Task.prefix, searchParams);
  };

  download = async (searchParams?: StatsSearchParameter) => {
    return this._client.request({
      method: 'GET',
      url: this._client.makeUrl(`${Task.prefix}/download`),
      params: searchParams,
      responseType: 'blob',
    });
  };
}

export default Statics;
