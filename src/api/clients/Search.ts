import BaseClient from '../base/BaseClient';
import { Page, Paginator } from '../interfaces/Common';
import { toCamel, toSnake } from 'snake-camel';
import { ErrorResInterface } from '../base/ApiClient';
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
  hostId: string;
}

export interface UpdateSearch extends CreateSearch {
  description: string;
}

export interface PatchSearch {
  publish?: boolean;
  query?: string;
  queryKey?: string;
  description?: string;
  hostId: string;
}

class SearchClient extends BaseClient {
  static readonly prefix = 'search';

  public all = async (
    params: AllParam,
  ): Promise<AllRes | ErrorResInterface | null> => {
    const res = await this._client.get('/all', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res.res?.data) as Paginator;
      data.data = data.data.map(toCamel);
      return data as AllRes;
    }
    return res.error;
  };

  public create = async (
    params: CreateSearch,
  ): Promise<Search | ErrorResInterface | null> => {
    const res = await this._client.post('/', toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res.res?.data);
      return data as Search;
    }

    return res.error;
  };

  public update = async (
    id: number,
    params: UpdateSearch,
  ): Promise<Search | ErrorResInterface | null> => {
    const res = await this._client.put(`'/${id}`, toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res.res?.data);
      return data as Search;
    }

    return res.error;
  };

  public patch = async (
    id: number,
    params: PatchSearch,
  ): Promise<Search | ErrorResInterface | null> => {
    const res = await this._client.patch(`/${id}`, toSnake(params));
    if (res.isSuccess) {
      const data = toCamel(res.res?.data);
      return data as Search;
    }

    return res.error;
  };

  public delete = async (
    id: number,
  ): Promise<boolean | ErrorResInterface | null> => {
    const res = await this._client.delete(`/${id}`);
    return res.isSuccess ? res.isSuccess : res.error;
  };
}

export default SearchClient;
