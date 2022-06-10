import BaseClient from '../BaseClient';
import { CreateQuestion, QuestionSearch } from '../interfaces/questions';
import { ApiClient } from '../../ApiClient';

class Questions extends BaseClient {
  static readonly prefix = 'api/v1/questions';

  constructor(client: ApiClient) {
    super(client);
  }

  getList = async (search: QuestionSearch, isAdmin: boolean) => {
    let url: string;
    if (isAdmin) {
      url = '/';
    } else {
      url = '/my';
    }
    return await this._client.get(url, search);
  };

  getById = async (id: number) => {
    return await this._client.get(`/${id}`);
  };

  getFile = async (id: number) => {
    return await this._client.request({
      url: this._client.makeUrl(`/${id}/file`),
      method: 'GET',
      responseType: 'blob',
    });
  };

  create = async (question: CreateQuestion) => {
    if (question.document) {
      this._client.attach({ name: 'document', file: question.document });
    }
    this._client.withHeader({ 'Content-Type': 'multipart/form-data' });

    return await this._client.post('/', {
      title: question.title,
      content: question.content,
      type: question.type,
      div: question.div,
    });
  };

  reply = async (questionId: number, reply: string) => {
    return await this._client.post(`/${questionId}/reply`, { content: reply });
  };
}

export default Questions;
