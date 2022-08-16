import BaseClient from '../BaseClient';
import {ApiClient, ApiResponse} from '../../ApiClient';
import {PostGroup, PatchGroup} from '../interfaces/group';
import {toSnake} from 'snake-camel';

class Groups extends BaseClient {
	static readonly prefix = 'api/groups';

	constructor(client: ApiClient) {
		super(client);
	}

	getGroups = async (): Promise<ApiResponse> => {
		return await this._client.get('/');
	};

	getGroup = async (groupId: number): Promise<ApiResponse> => {
		return await this._client.get(`/${groupId}`);
	};

	createGroup = async (data: PostGroup): Promise<ApiResponse> => {
		return await this._client.post('/', toSnake(data));
	};

	updateGroup = async (data: PatchGroup): Promise<ApiResponse> => {
		return await this._client.patch('/', toSnake(data));
	};

	deleteGroup = async (groupId: number): Promise<ApiResponse> => {
		return await this._client.delete(`/${groupId}`);
	};
}

export default Groups;
