import BaseClient from 'utils/api/BaseClient';
import { ErrorResInterface } from 'utils/api/ApiClient';
import { Host } from 'utils/api/interfaces/Host';
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

class HostClient extends BaseClient {
  static readonly prefix: string = 'hosts';

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
}

export default HostClient;
