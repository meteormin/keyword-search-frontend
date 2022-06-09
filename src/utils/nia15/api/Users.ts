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

  async getGroup(id?: number) {
    let url = GroupClient.prefix;
    if (id) {
      url += `/${id}`;
    }

    return await this._client.get(url);
  }

  async patchGroupPerm(permissions: UpdateGroupPerm) {
    return await this._client.patch(
      `/${GroupClient.prefix}/${permissions.id}`,
      {
        permissions: permissions.permissions,
      },
    );
  }

  // async getPermissions(){
  //   return await this._client.get('api/v1/groups/permissions');
  // }

  async createGroup(group: Group | CreateGroup): Promise<ApiResponse> {
    return await this._client.post(`/${GroupClient.prefix}/`, group);
  }

  async updateGroup(group: Group): Promise<ApiResponse> {
    return await this._client.patch(`/${GroupClient.prefix}/`, group);
  }
}

class UserClient extends BaseClient {
  static readonly prefix = 'users';

  async getUser(id?: number) {
    let url = UserClient.prefix;
    if (id) {
      url += `/${id}`;
    }

    return await this._client.get(url);
  }

  async resetPassword(id: number) {
    const url = `/${UserClient.prefix}/${id}/password`;
    return await this._client.patch(url);
  }

  async createUser(user: CreateUser) {
    const url = `/auth/signUp`;
    return await this._client.post(url, {
      id: user.loginId,
      name: user.name,
      userType: user.userType,
      group: user.groupId,
    });
  }

  async updateUser(user: User) {
    const url = `/${UserClient.prefix}`;
    return await this._client.patch(url, user);
  }

  async updatePassword(id: number, password: string) {
    const url = `/${UserClient.prefix}/me/password`;
    return await this._client.patch(url, {
      password: password,
    });
  }

  async me() {
    return await this._client.get(`/${UserClient.prefix}/me`);
  }
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
