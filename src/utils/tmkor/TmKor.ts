import { ApiClient, ApiResponse } from '../ApiClient';
import { AnalyzeData } from '../BaikalNlp';
import { toCamel } from 'snake-camel';
import { apiResponse } from '../../helpers';

export interface getFrameRequest extends AnalyzeData {
  language: string;
}

export interface CheckDualFrameRequest {
  tagged_text_1: getFrameRequest;
  tagged_text_2: getFrameRequest;
}

export interface CheckTripleFrameRequest extends CheckDualFrameRequest {
  tagged_text_default: getFrameRequest;
}

export interface FrameText {
  frameText: string;
  sourceId?: string;
  refSrc?: string;
  refId?: string;
}

export interface DualFrameText {
  duplicated: boolean;
  frame1: FrameText;
  frame2: FrameText;
}

export interface TripleFrameText extends DualFrameText {
  frame_default: FrameText;
}

export interface TmKorResponse {
  type: string;
  title: string;
  detail: string;
  status: string;
  data: FrameText[] | DualFrameText[] | TripleFrameText[];
  msg: string;
}

class TmKor {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  public async getFrame(
    request: getFrameRequest,
  ): Promise<TmKorResponse | null> {
    const response: ApiResponse = await this.client.post(
      'v1.0/get_frame',
      request,
    );

    if (response.isSuccess) {
      return toCamel(apiResponse(response)) as TmKorResponse;
    } else {
      return null;
    }
  }

  public async checkDualFrame(
    request: CheckDualFrameRequest,
  ): Promise<TmKorResponse | null> {
    const response: ApiResponse = await this.client.post(
      'v1.0/check_dual_frame',
      request,
    );

    if (response.isSuccess) {
      return toCamel(apiResponse(response)) as TmKorResponse;
    } else {
      return null;
    }
  }

  public async checkTripleFrame(
    request: CheckTripleFrameRequest,
  ): Promise<TmKorResponse | null> {
    const response: ApiResponse = await this.client.post(
      'v1.0/check_triple_frame',
      request,
    );

    if (response.isSuccess) {
      return toCamel(apiResponse(response)) as TmKorResponse;
    } else {
      return null;
    }
  }
}

export default TmKor;
