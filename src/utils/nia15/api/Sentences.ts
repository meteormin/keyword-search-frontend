import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';
import { CreateSentence } from '../interfaces/sentences';

class Sentences extends BaseClient {
  static readonly prefix = '/api/v1/sentences';

  constructor(client: ApiClient) {
    super(client);
  }

  getSentenceList = async (search?: SearchParameter) => {
    return await this._client.get('/', search);
  };

  getSentence = async (id: number) => {
    return await this._client.get(`/${id}`);
  };

  createSentence = async (sentence: CreateSentence) => {
    return await this._client.post('/', sentence);
  };

  createTempSentence = async (sentence: CreateSentence) => {
    return await this._client.post('/temp', sentence);
  };

  createdCount = async () => {
    return await this._client.get('/created/count');
  };
}

export default Sentences;
