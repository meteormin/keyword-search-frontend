import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';
import { PaginationParameter } from '../interfaces/common';
import { PostUser, PatchUser } from '../interfaces/user';
import { toSnake } from 'snake-camel';

class Users extends BaseClient {
  static readonly prefix = 'api/users';

  constructor(client: ApiClient) {
    super(client);
  }

  getUsers = async (parameter: PaginationParameter): Promise<ApiResponse> => {
    return await this._client.get('/', toSnake(parameter));
  };

  getUser = async (userId: number) => {
    return await this._client.get(`/${userId}`);
  };

  createUser = async (data: PostUser) => {
    return await this._client.post('/', toSnake(data));
  };

  updateUser = async (userId: number, data: PatchUser) => {
    return await this._client.patch(`/${userId}`, toSnake(data));
  };

  resetPassword = async (userId: number, password: string) => {
    return await this._client.patch(`/${userId}`, {
      password: password,
    });
  };

  deleteUser = async (userId: number) => {
    return await this._client.delete(`/${userId}`);
  };

  me = async () => {
    return await this._client.get('/me');
  };
}

export default Users;
