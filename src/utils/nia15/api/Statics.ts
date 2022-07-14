import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { StatsSearchParameter } from '../interfaces/search';

class Statics extends BaseClient {
  static readonly prefix = 'api/v1/statistic';

  public readonly task: Task;
  public readonly user: User;

  constructor(client: ApiClient) {
    super(client);
    this.task = new Task(client);
    this.user = new User(client);
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

  downloadReport = async () => {
    return this._client.request({
      method: 'GET',
      url: this._client.makeUrl(`sentence/download`),
      responseType: 'blob',
    });
  };

  downloadJson = async (searchParams?: StatsSearchParameter) => {
    return this._client.request({
      method: 'GET',
      url: this._client.makeUrl(`${Task.prefix}/finished/download`),
      params: searchParams,
      responseType: 'blob',
    });
  };
}

class User extends BaseClient {
  static readonly prefix = 'user';

  constructor(client: ApiClient) {
    super(client);
  }

  getCreatorStats = async (searchParams?: StatsSearchParameter) => {
    return await this._client.get(`${User.prefix}/creator`, searchParams);
  };

  download = async (searchParams?: StatsSearchParameter) => {
    return this._client.request({
      method: 'GET',
      url: this._client.makeUrl(`${User.prefix}/creator/download`),
      params: searchParams,
      responseType: 'blob',
    });
  };

  getReviewerStats = async (
    seq: number,
    searchParams?: StatsSearchParameter,
  ) => {
    return this._client.get(`${User.prefix}/reviewer${seq}`, searchParams);
  };

  downloadReviewerStats = async (
    seq: number,
    searchParams?: StatsSearchParameter,
  ) => {
    return this._client.request({
      method: 'GET',
      url: this._client.makeUrl(`${User.prefix}/reviewer${seq}/download`),
      params: searchParams,
      responseType: 'blob',
    });
  };
}

export default Statics;
