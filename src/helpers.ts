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
import * as Arr from './utils/arr';
import BaikalNlp from './utils/BaikalNlp';
import { makePath } from './utils/str';
import { useEffect, useRef } from 'react';
import TmKor, {
  CheckDualFrameRequest,
  CheckTripleFrameRequest,
  DualFrameText,
  FrameText,
  getFrameRequest,
  TripleFrameText,
} from './utils/tmkor/TmKor';
import { switchReviewStatus as switchRS } from './utils/common/status';
import makeClient, { Clients } from './utils/nia153/api';

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

export const arr = Arr;

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

export const makeSentenceTagged = async (
  sentence: string,
): Promise<string | null> => {
  try {
    const baikalRes = await baikalNlp.analyze(sentence);
    let sentenceTag: string | null = null;
    if (baikalRes) {
      if (baikalRes?.sentences && baikalRes.sentences.length != 0) {
        sentenceTag = baikalRes.sentences[0].tokens
          .map((t) => t.tagged)
          .join(' ');
      }

      return sentenceTag;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
  return null;
};

export const makeSentencePattern = async (
  sentence: string,
): Promise<{ tagged: string; pattern: string } | null> => {
  try {
    const baikalRes = await baikalNlp.analyze(sentence);

    if (baikalRes) {
      const sentencePattern: { tagged: string; pattern: string } = {
        tagged: '',
        pattern: '',
      };

      if (baikalRes?.sentences && baikalRes.sentences.length != 0) {
        sentencePattern.tagged = baikalRes.sentences[0].tokens
          .map((t) => t.tagged)
          .join(' ');
      }

      const req: getFrameRequest = {
        sentences: baikalRes?.sentences || [],
        language: 'ko_KR',
      };
      const tmKorRes = await tmKor.getFrame(req);
      if (tmKorRes) {
        const data = tmKorRes.data[0] as FrameText;
        sentencePattern.pattern = data.frameText;

        return sentencePattern;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const checkDualFrame = async (sentences: {
  text1: string;
  text2: string;
}): Promise<DualFrameText | null> => {
  try {
    const baikalRes1 = await baikalNlp.analyze(sentences.text1);
    const baikalRes2 = await baikalNlp.analyze(sentences.text2);
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

export const checkTripleFrame = async (sentences: {
  defaultText: string;
  text1: string;
  text2: string;
}) => {
  try {
    const baikalBasic = await baikalNlp.analyze(sentences.defaultText);
    const baikalStr1 = await baikalNlp.analyze(sentences.text1);
    const baikalStr2 = await baikalNlp.analyze(sentences.text2);
    const req: CheckTripleFrameRequest = {
      tagged_text_default: {
        sentences: baikalBasic?.sentences || [],
        language: 'ko_KR',
      },
      tagged_text_1: {
        sentences: baikalStr1?.sentences || [],
        language: 'ko_KR',
      },
      tagged_text_2: {
        sentences: baikalStr2?.sentences || [],
        language: 'ko_KR',
      },
    };

    const res = await tmKor.checkTripleFrame(req);
    if (res) {
      return res.data[0] as TripleFrameText;
    }
  } catch (e) {
    return null;
  }

  return null;
};

export const switchReviewStatus = switchRS;

export function usePrev<T>(value: T): T {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value as T;
  });

  return ref.current as T;
}

export interface Reportable {
  message: string;
  context: object;
}

export const reportError = async (
  r: Reportable,
): Promise<ApiResponse | null> => {
  try {
    console.log(r);
    const reportApi = makeClient(Clients.Report);
    return await reportApi.report(r);
  } catch (e) {
    console.error(e);
    return null;
  }
};
