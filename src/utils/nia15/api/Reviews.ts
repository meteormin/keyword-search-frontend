import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';
import { CreateReview, UpdateReview } from '../interfaces/reviews';

class Reviews extends BaseClient {
  static readonly prefix = 'api/v1';

  constructor(client: ApiClient) {
    super(client);
  }

  async assign(seq: number, search?: SearchParameter) {
    return await this._client.post(`/reviews/${seq}/assign`, search);
  }

  async getAssignList(seq: number, search?: SearchParameter) {
    return await this._client.get(`/reviews/${seq}/assigned`, search);
  }

  async getAssign(seq: number, assignId: number) {
    return await this._client.get(`/sentences/${assignId}`);
  }

  async getReviewList(seq: number, search?: SearchParameter) {
    return await this._client.get(`/reviews/${seq}`, search);
  }

  async getReview(seq: number, id: number) {
    return await this._client.get(`/reviews/${seq}/${id}`);
  }

  async createReview(seq: number, createReview: CreateReview) {
    return await this._client.post(`/reviews/${seq}`, createReview);
  }

  async updateReview(seq: number, id: number, updateReview: UpdateReview) {
    return await this._client.patch(`/reviews/${seq}/${id}`, updateReview);
  }

  async getExpiredAt(seq: number) {
    return await this._client.get(`/reviews/${seq}/assign/expiredAt`);
  }
}

export default Reviews;
