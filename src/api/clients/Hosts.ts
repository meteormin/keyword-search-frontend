import BaseClient from 'api/base/BaseClient';
import { ApiResponse, ErrorResInterface } from 'api/base/ApiClient';
import { Host } from 'api/interfaces/Hosts';
import { toCamel, toSnake } from 'snake-camel';
import { Page } from 'api/interfaces/Common';
import { Search } from 'api/interfaces/Search';

export interface GetListParam extends Page {
  page: number;
  pageSize: number;
}

export interface GetList {
  page: number;
  pageSize: number;
  totalCount: number;
  data: Host[];
}

export interface GetSubjects {
  page: number;
  pageSize: number;
  totalCount: number;
  data: { id: number; subject: string }[];
}

export interface GetSearchParam extends Page {
  query?: string;
  queryKey?: string;
  publish?: boolean;
  sortBy?: string;
  orderBy?: string;
}

export interface GetSearch {
  page: number;
  pageSize: number;
  totalCount: number;
  data: Search[];
}

export interface GetSearchDescriptions {
  page: number;
  pageSize: number;
  totalCount: number;
  data: { id: number; description: string; shortUrl: string }[];
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
  static readonly prefix: string = '/api/hosts';

  public create = async (
    params: CreateHost,
  ): Promise<ApiResponse<Host | ErrorResInterface>> => {
    const res = await this._client.post('/', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data) as any;
      res.data = toCamel(data) as Host;
    }
    return res;
  };

  public find = async (
    id: number,
  ): Promise<ApiResponse<Host | ErrorResInterface>> => {
    const res = await this._client.get(`/${id}`);
    if (res.isSuccess) {
      res.data = toCamel(res?.data) as Host;
    }
    return res;
  };

  public getSubjects = async (
    params: GetListParam,
  ): Promise<ApiResponse<GetSubjects | ErrorResInterface>> => {
    const res = await this._client.get('/subjects', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data) as any;
      res.data = {
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        data: data.data.map(toCamel) as { id: number; subject: string }[],
      };
    }

    return res;
  };

  public getList = async (
    params: GetListParam,
  ): Promise<ApiResponse<GetList | ErrorResInterface>> => {
    const res = await this._client.get('/', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data) as any;
      res.data = {
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        data: data.data.map(toCamel) as Host[],
      };
    }

    return res;
  };

  public getSearch = async (
    id: number,
    query: GetSearchParam,
  ): Promise<ApiResponse<GetSearch | ErrorResInterface>> => {
    const res = await this._client.get(`/${id}/search`, toSnake(query));
    if (res.isSuccess) {
      const data = toCamel(res?.data) as any;
      res.data = {
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        data: data.data.map(toCamel) as Search[],
      };
    }

    return res;
  };

  public getSearchDescriptions = async (
    id: number,
    query: GetSearchParam,
  ): Promise<ApiResponse<GetSearchDescriptions | ErrorResInterface>> => {
    const res = await this._client.get(
      `/${id}/search/descriptions`,
      toSnake(query),
    );
    if (res.isSuccess) {
      const data = toCamel(res?.data) as any;
      res.data = {
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        data: data.data.map(toCamel) as {
          id: number;
          description: string;
          shortUrl: string;
        }[],
      };
    }

    return res;
  };

  public update = async (
    id: number,
    params: UpdateHost,
  ): Promise<ApiResponse<Host | ErrorResInterface>> => {
    const res = await this._client.put(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      res.data = toCamel(res?.data) as Host;
    }
    return res;
  };

  public patch = async (
    id: number,
    params: PatchHost,
  ): Promise<ApiResponse<Host | ErrorResInterface>> => {
    const res = await this._client.patch(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      res.data = toCamel(res?.data) as Host;
    }
    return res;
  };

  public delete = async (
    id: number,
  ): Promise<ApiResponse<boolean | ErrorResInterface>> => {
    const res = await this._client.delete(`/${id}`);
    if (res.isSuccess) {
      res.data = res.isSuccess;
    }
    return res;
  };
}

export default HostClient;
