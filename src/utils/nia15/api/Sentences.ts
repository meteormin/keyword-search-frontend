import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';
import { CreateSentence } from '../interfaces/sentences';

class Sentences extends BaseClient {
  static readonly prefix = '/api/v1/sentences';

  constructor(client: ApiClient) {
    super(client);
  }

  async getSentenceList(search?: SearchParameter) {
    return await this._client.get('/', search);
  }

  async getSentence(id: number) {
    return await this._client.get(`/${id}`);
  }

  async createSentence(sentence: CreateSentence) {
    return await this._client.post('/', sentence);
  }

  async createTempSentence(sentence: CreateSentence) {
    return await this._client.post('/temp', sentence);
  }
}

export default Sentences;
