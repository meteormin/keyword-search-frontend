import BaseClient from '../base/BaseClient';
import { toCamel, toSnake } from 'snake-camel';
import { ErrorResInterface } from '../base/ApiClient';
import { AuthUser } from '../interfaces/Auth';
import { AccessToken } from '../../utils/auth';

export interface TokenParam {
  username: string;
  password: string;
}

export interface TokenRes {
  expiresAt: string;
  token: string;
}

export interface RegisterParam extends TokenParam {
  email: string;
  passwordConfirm: string;
}

export interface ResisterRes extends TokenRes {
  userId: string;
}

export interface Me extends AuthUser {
  expiresAt: string;
}

export interface PasswordParam {
  password: string;
  passwordConfirm: string;
}

class AuthClient extends BaseClient {
  static readonly prefix = '/api/auth';

  public token = async (
    params: TokenParam,
  ): Promise<TokenRes | ErrorResInterface | null> => {
    const res = await this._client.post('/token', toSnake(params));
    if (res.isSuccess) {
      const data = res.res?.data;
      return toCamel(data) as TokenRes;
    }
    return res.error;
  };

  public register = async (
    params: RegisterParam,
  ): Promise<ResisterRes | ErrorResInterface | null> => {
    const res = await this._client.post('/register', toSnake(params));
    if (res.isSuccess) {
      const data = res.res?.data;
      return toCamel(data) as ResisterRes;
    }

    return res.error;
  };

  public me = async (
    token?: AccessToken,
  ): Promise<Me | ErrorResInterface | null> => {
    if (token) {
      this._client.withToken(token.token, token.tokenType || 'bearer');
    }

    const res = await this._client.get('/me');
    if (res.isSuccess) {
      const data = res.res?.data;
      return toCamel(data) as Me;
    }

    return res.error;
  };

  public revoke = async (): Promise<boolean | ErrorResInterface | null> => {
    const res = await this._client.delete('/revoke');
    return res.isSuccess ? res.isSuccess : res.error;
  };

  public password = async (
    params: PasswordParam,
  ): Promise<AuthUser | ErrorResInterface | null> => {
    const res = await this._client.patch('/password', toSnake(params));
    if (res.isSuccess) {
      return toCamel(res.res?.data) as AuthUser;
    }

    return res.error;
  };
}

export default AuthClient;
