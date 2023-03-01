import BaseClient from '../base/BaseClient';
import { Page, Paginator } from '../interfaces/Common';
import { toCamel, toSnake } from 'snake-camel';
import { ApiResponse, ErrorResInterface } from '../base/ApiClient';
import { Search } from '../interfaces/Search';

export interface AllParam extends Page {
  page: number;
  pageSize: number;
}

export interface AllRes extends Paginator {
  data: Search[];
}

export interface CreateSearch {
  publish: boolean;
  query: string;
  queryKey: string;
  description: string;
  hostId: number;
}

export interface UpdateSearch extends CreateSearch {
  description: string;
}

export interface PatchSearch {
  publish?: boolean;
  query?: string;
  queryKey?: string;
  description?: string;
  hostId: number;
}

class SearchClient extends BaseClient {
  static readonly prefix = '/api/search';

  public all = async (
    params: AllParam,
  ): Promise<ApiResponse<AllRes | ErrorResInterface>> => {
    const res = await this._client.get('/all', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data) as Paginator;
      data.data = data.data.map(toCamel);
      res.data = data as AllRes;
    }
    return res;
  };

  public create = async (
    params: CreateSearch,
  ): Promise<ApiResponse<Search | ErrorResInterface>> => {
    const res = await this._client.post('/', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data);
      res.data = data as Search;
    }
    return res;
  };

  public update = async (
    id: number,
    params: UpdateSearch,
  ): Promise<ApiResponse<Search | ErrorResInterface>> => {
    const res = await this._client.put(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data);
      res.data = data as Search;
    }
    return res;
  };

  public patch = async (
    id: number,
    params: PatchSearch,
  ): Promise<ApiResponse<Search | ErrorResInterface>> => {
    const res = await this._client.patch(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res?.data);
      res.data = data as Search;
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

export default SearchClient;
