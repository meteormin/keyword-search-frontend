import BaseClient from '../BaseClient';
import { ApiClient } from '../../ApiClient';
import { SearchParameter } from '../interfaces/search';
import { CreateReview, UpdateReview } from '../interfaces/reviews';

class Reviews extends BaseClient {
  static readonly prefix = 'api/v1';

  constructor(client: ApiClient) {
    super(client);
  }

  assign = async (seq: number, search?: SearchParameter) => {
    return await this._client.post(`/reviews/${seq}/assign`, search);
  };

  getAssignList = async (seq: number, search?: SearchParameter) => {
    return await this._client.get(`/reviews/${seq}/assigned`, search);
  };

  getAssign = async (seq: number, assignId: number) => {
    return await this._client.get(`/sentences/${assignId}`);
  };

  getReviewList = async (seq: number, search?: SearchParameter) => {
    return await this._client.get(`/reviews/${seq}`, search);
  };

  getReview = async (seq: number, id: number) => {
    return await this._client.get(`/reviews/${seq}/${id}`);
  };

  createReview = async (seq: number, createReview: CreateReview) => {
    return await this._client.post(`/reviews/${seq}`, createReview);
  };

  updateReview = async (
    seq: number,
    id: number,
    updateReview: UpdateReview,
  ) => {
    return await this._client.patch(`/reviews/${seq}/${id}`, updateReview);
  };

  getExpiredAt = async (seq: number) => {
    return await this._client.get(`/reviews/${seq}/assign/expiredAt`);
  };
}

export default Reviews;
