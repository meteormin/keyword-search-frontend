import BaseClient from 'api/base/BaseClient';
import { ErrorResInterface } from 'api/base/ApiClient';
import { Host } from 'api/interfaces/Host';
import { toCamel, toSnake } from 'snake-camel';

export interface GetListParam {
  page: number;
  pageSize: number;
}

export interface GetList {
  page: number;
  pageSize: number;
  totalCount: number;
  data: Host[];
}

export interface CreateHost {
  host: string;
  path: string;
  description: string;
  publish: boolean;
  subject: string;
}

export interface UpdateHost extends CreateHost {
  host: string;
}

export interface PatchHost {
  host?: string;
  subject?: string;
  description?: string;
  path?: string;
  publish?: boolean;
}

class HostClient extends BaseClient {
  static readonly prefix: string = 'hosts';

  public create = async (
    params: CreateHost,
  ): Promise<Host | ErrorResInterface | null> => {
    const res = await this._client.post('/', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res.res?.data) as any;
      return toCamel(data) as Host;
    }

    return res.error;
  };

  public find = async (
    id: number,
  ): Promise<Host | ErrorResInterface | null> => {
    const res = await this._client.get(`/${id}`);
    if (res.isSuccess) {
      return toCamel(res.res?.data) as Host;
    }

    return res.error;
  };

  public getList = async (
    params: GetListParam,
  ): Promise<GetList | ErrorResInterface | null> => {
    const result = await this._client.get('/', toSnake(params));
    if (result.isSuccess) {
      const data = toCamel(result.res?.data) as any;
      return {
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        data: data.data.map(toCamel) as Host[],
      };
    }

    return result.error;
  };

  public update = async (
    id: number,
    params: UpdateHost,
  ): Promise<Host | ErrorResInterface | null> => {
    const res = await this._client.put(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      return toCamel(res.res?.data) as Host;
    }
    return res.error;
  };

  public patch = async (id: number, params: PatchHost) => {
    const res = await this._client.patch(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      return toCamel(res.res?.data) as Host;
    }
    return res.error;
  };

  public delete = async (id: number): Promise<boolean> => {
    const result = await this._client.delete(`/${id}`);
    return result.isSuccess;
  };
}

export default HostClient;
