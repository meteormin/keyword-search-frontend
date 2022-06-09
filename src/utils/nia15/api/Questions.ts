import BaseClient from '../BaseClient';
import { CreateQuestion, QuestionSearch } from '../interfaces/questions';
import { ApiClient } from '../../ApiClient';

class Questions extends BaseClient {
  static readonly prefix = 'api/v1/questions';

  constructor(client: ApiClient) {
    super(client);
  }

  async getList(search: QuestionSearch, isAdmin: boolean) {
    let url: string;
    if (isAdmin) {
      url = '/';
    } else {
      url = '/my';
    }
    return await this._client.get(url, search);
  }

  async getById(id: number) {
    return await this._client.get(`/${id}`);
  }

  async getFile(id: number) {
    return await this._client.get(`/${id}/file`);
  }

  async create(question: CreateQuestion) {
    if (question.document) {
      this._client.attach({ name: 'document', file: question.document });
    }

    return await this._client.post('/', {
      title: question.title,
      content: question.content,
      type: question.type,
      div: question.div,
    });
  }

  async reply(questionId: number, reply: string) {
    return await this._client.post(`/${questionId}/reply`, { content: reply });
  }
}

export default Questions;
