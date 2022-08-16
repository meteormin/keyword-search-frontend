import BaseClient from '../BaseClient';
import {ApiClient, ApiResponse} from '../../ApiClient';
import {toSnake} from 'snake-camel';
import {PostScore, PatchScore, SearchAssigns, SearchScores} from '../interfaces/score';

class Scores extends BaseClient {
	static readonly prefix = 'api/scores';

	constructor(client: ApiClient) {
		super(client);
	}

	getAssign = async (parameter: SearchAssigns): Promise<ApiResponse> => {
		return await this._client.get('/assigns', toSnake(parameter));
	};

	getScores = async (parameter: SearchScores): Promise<ApiResponse> => {
		return await this._client.get('/', toSnake(parameter));
	};

	getScore = async (scoreId: number): Promise<ApiResponse> => {
		return await this._client.get(`/${scoreId}`);
	};

	createScore = async (data: PostScore): Promise<ApiResponse> => {
		return await this._client.post('/', toSnake(data));
	};

	updateScore = async (scoreId: number, data: PatchScore): Promise<ApiResponse> => {
		return await this._client.patch(`/${scoreId}`, toSnake(data));
	}

}

export default Scores;
