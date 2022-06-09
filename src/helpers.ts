import * as Auth from './utils/auth';
import * as Api from './utils/ApiClient';
import Config from './config';
import HiddenByRole from './utils/HiddenByRole';
import Restricted from './utils/Restricted';
import Protected from './utils/Protected';
import {
  ApiClient,
  ApiResponse,
  ErrorResInterface,
  Token,
} from './utils/ApiClient';
import moment from 'moment';
import 'moment/locale/ko';
import Lang from './assets/lang';
import { AxiosRequestHeaders } from 'axios';
import * as Str from './utils/str';
import BaikalNlp from './utils/BaikalNlp';
import { makePath } from './utils/str';
import { useEffect, useRef } from 'react';
import TmKor, {
  CheckDualFrameRequest,
  DualFrameText,
  FrameText,
  getFrameRequest,
} from './utils/tmkor/TmKor';
import { switchReviewStatus as switchRS } from './utils/common/status';

export const config = Config();
export const auth = Auth;

export interface ApiConfig {
  host?: string | null;
  prefix?: string | null;
  headers?: AxiosRequestHeaders;
  token?: Token;
}

/**
 * @param {ApiConfig} apiConfig
 * @returns {ApiClient}
 */
export const api = (apiConfig?: ApiConfig): ApiClient => {
  if (apiConfig?.prefix) {
    if (!apiConfig?.host) {
      apiConfig.host = config.api.default.host as string;
    }

    try {
      const url = new URL(apiConfig.host);
      apiConfig.host =
        url.protocol +
        '//' +
        makePath(url.host + url.pathname, apiConfig.prefix);
    } catch (error) {
      const url = new URL(window.location.href);
      apiConfig.host =
        url.protocol +
        '//' +
        makePath(url.host + apiConfig.host, apiConfig.prefix);
    }
  }

  if (apiConfig?.host) {
    try {
      const url = new URL(apiConfig.host);
      apiConfig.host = url.protocol + '//' + url.host + url.pathname;
    } catch (error) {
      const url = new URL(window.location.href);
      apiConfig.host = url.protocol + '//' + url.host + apiConfig.host;
    }
  }

  const client = apiConfig?.host
    ? new Api.ApiClient(apiConfig.host)
    : new Api.ApiClient(config.api.default.host as string);

  if (apiConfig) {
    if (apiConfig.headers) {
      client.withHeader(apiConfig.headers);
    }
    if (apiConfig.token) {
      client.withToken(
        apiConfig.token.token as string,
        apiConfig.token.tokenType as string,
      );
    }
  }

  return client;
};

export const apiResponse = (res: ApiResponse): any | ErrorResInterface => {
  if (res.isSuccess && res.res) {
    return res.res.data;
  }

  if (res.error) {
    return res.error;
  }
};

export const guard = {
  HiddenByRole,
  Restricted,
  Protected,
  handleByRole: (
    path: string,
    role: string,
    rules: { [key: string]: string[] },
  ) => {
    return path in rules[role];
  },
};

// moment.locale('ko');
export const date = moment;

export const lang = Lang();

export const str = Str;

export const baikalNlp = new BaikalNlp(
  api({ host: config.api.baikalNlp.host }),
);

export const tmKor = new TmKor(
  api({
    host: config.api.tmkor.host,
    headers: {
      'X-Auth': config.api.tmkor.token as string,
    },
  }),
);

export const makeSentencePattern = async (
  sentence: string,
): Promise<string | null> => {
  try {
    const baikalRes = await baikalNlp.analyze(sentence);
    const req: getFrameRequest = {
      sentences: baikalRes?.sentences || [],
      language: 'ko_KR',
    };
    const tmKorRes = await tmKor.getFrame(req);
    if (tmKorRes) {
      const data = tmKorRes.data[0] as FrameText;
      return data.frameText || null;
    }
  } catch (e) {
    return null;
  }

  return null;
};

export const checkDualFrame = async (
  str1: string,
  str2: string,
): Promise<DualFrameText | null> => {
  try {
    const baikalRes1 = await baikalNlp.analyze(str1);
    const baikalRes2 = await baikalNlp.analyze(str2);
    const req: CheckDualFrameRequest = {
      tagged_text_1: {
        sentences: baikalRes1?.sentences || [],
        language: 'ko_KR',
      },
      tagged_text_2: {
        sentences: baikalRes2?.sentences || [],
        language: 'ko_KR',
      },
    };

    const res = await tmKor.checkDualFrame(req);
    if (res) {
      return res.data[0] as DualFrameText;
    }
  } catch (e) {
    return null;
  }

  return null;
};

export const switchReviewStatus = switchRS;

export function usePrev<T>(value: T): T {
  const ref = useRef();

  useEffect(() => {
    ref.current = value as any;
  });

  return ref.current as any;
}
