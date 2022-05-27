import { ApiClient, ApiResponse } from '../ApiClient';
import { AnalyzeSentence } from '../BaikalNlp';
import { toCamel } from 'snake-camel';
import { apiResponse } from '../../helpers';

export interface getFrameRequest {
  sentence: string;
  concepts: { stem: string; postag: string }[];
  tagged: AnalyzeSentence;
  posLength: number;
  existEC?: boolean;
  id: string;
  refSrc: string;
  refId: string;
  domain: string;
  dropReason?: string;
  drop?: boolean;
}

export interface CheckDualFrameRequest {
  taggedText1: getFrameRequest;
  taggedText2: getFrameRequest;
}

export interface FrameText {
  frameText: string;
  sourceId: string;
  refSrc: string;
  refId: string;
}

export interface DualFrameText {
  duplicated: boolean;
  frame1: FrameText;
  frame2: FrameText;
}

export interface TmKorResponse {
  type: string;
  title: string;
  detail: string;
  status: string;
  data: FrameText[] | DualFrameText[];
  msg: string;
}

class TmKor {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  public async getFrame(
    request: getFrameRequest[],
  ): Promise<FrameText[] | null> {
    const response: ApiResponse = await this.client.post(
      'v1.0/get_frame',
      request,
    );

    if (response.isSuccess) {
      return apiResponse(response).map(toCamel) as FrameText[];
    } else {
      return null;
    }
  }

  public async checkDualFrame(
    request: CheckDualFrameRequest[],
  ): Promise<DualFrameText[] | null> {
    const response: ApiResponse = await this.client.post(
      'v1.0/check_dual_frame',
      request,
    );

    if (response.isSuccess) {
      return apiResponse(response).map(toCamel) as DualFrameText[];
    } else {
      return null;
    }
  }
}

export default TmKor;
