import BaseClient from '../BaseClient';
import { ApiClient, ApiResponse } from '../../ApiClient';
import {
  CreateGroup,
  CreateUser,
  UpdateGroupPerm,
  Group,
  User,
} from '../interfaces/users';

class GroupClient extends BaseClient {
  static readonly prefix = 'groups';

  constructor(client: ApiClient) {
    super(client);
  }

  getGroup = async (id?: number) => {
    let url = GroupClient.prefix;
    if (id) {
      url += `/${id}`;
    }

    return await this._client.get(url);
  };

  patchGroupPerm = async (permissions: UpdateGroupPerm) => {
    return await this._client.patch(
      `/${GroupClient.prefix}/${permissions.id}`,
      {
        permissions: permissions.permissions,
      },
    );
  };

  // async getPermissions(){
  //   return await this._client.get('api/v1/groups/permissions');
  // }

  createGroup = async (group: Group | CreateGroup): Promise<ApiResponse> => {
    return await this._client.post(`/${GroupClient.prefix}/`, group);
  };

  updateGroup = async (group: Group): Promise<ApiResponse> => {
    return await this._client.patch(`/${GroupClient.prefix}/`, group);
  };
}

class UserClient extends BaseClient {
  static readonly prefix = 'users';

  constructor(client: ApiClient) {
    super(client);
  }

  getUser = async (id?: number) => {
    let url = UserClient.prefix;
    if (id) {
      url += `/${id}`;
    }

    return await this._client.get(url);
  };

  resetPassword = async (id: number) => {
    const url = `/${UserClient.prefix}/${id}/password`;
    return await this._client.patch(url);
  };

  createUser = async (user: CreateUser) => {
    const url = `/auth/signUp`;
    return await this._client.post(url, {
      id: user.loginId,
      name: user.name,
      userType: user.userType,
      group: user.groupId,
    });
  };

  updateUser = async (user: User) => {
    const url = `/${UserClient.prefix}`;
    return await this._client.patch(url, user);
  };

  updatePassword = async (id: number, password: string) => {
    const url = `/${UserClient.prefix}/me/password`;
    return await this._client.patch(url, {
      password: password,
    });
  };

  me = async () => {
    return await this._client.get(`/${UserClient.prefix}/me`);
  };
}

class Users extends BaseClient {
  static readonly prefix = 'api/v1';
  public readonly group: GroupClient;
  public readonly user: UserClient;

  constructor(client: ApiClient) {
    super(client);
    this.group = new GroupClient(client);
    this.user = new UserClient(client);
  }
}

export default Users;
