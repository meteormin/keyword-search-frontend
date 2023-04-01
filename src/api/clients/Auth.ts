import BaseClient from '../base/BaseClient';
import { toCamel, toSnake } from 'snake-camel';
import { ApiResponse, ErrorResInterface } from '../base/ApiClient';
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
    ): Promise<ApiResponse<TokenRes | ErrorResInterface>> => {
        const res = await this._client.post('/token', toSnake(params));
        if (res.isSuccess) {
            const data = res?.data;
            res.data = toCamel(data) as TokenRes;
        }
        return res;
    };

    public register = async (
        params: RegisterParam,
    ): Promise<ApiResponse<ResisterRes | ErrorResInterface>> => {
        const res = await this._client.post('/register', toSnake(params));
        if (res.isSuccess) {
            const data = res?.data;
            res.data = toCamel(data) as ResisterRes;
        }
        return res;
    };

    public me = async (
        token?: AccessToken,
    ): Promise<ApiResponse<Me | ErrorResInterface>> => {
        if (token) {
            this._client.withToken(token.token, token.tokenType || 'bearer');
        }
        const res = await this._client.get('/me');
        if (res.isSuccess) {
            const data = res?.data;
            res.data = toCamel(data) as Me;
        }
        return res;
    };

    public revoke = async (): Promise<
        ApiResponse<boolean | ErrorResInterface>
    > => {
        const res = await this._client.delete('/revoke');
        if (res.isSuccess) {
            res.data = res.isSuccess;
        }
        return res;
    };

    public password = async (
        params: PasswordParam,
    ): Promise<ApiResponse<AuthUser | ErrorResInterface>> => {
        const res = await this._client.patch('/password', toSnake(params));
        if (res.isSuccess) {
            res.data = toCamel(res?.data) as AuthUser;
        }
        return res;
    };
}

export default AuthClient;
