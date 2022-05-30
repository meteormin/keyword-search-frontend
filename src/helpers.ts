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
  ErrorResponse,
  Token,
} from './utils/ApiClient';
import moment from 'moment';
import 'moment/locale/ko';
import Lang from './assets/lang';
import { AxiosRequestHeaders } from 'axios';
import * as Str from './utils/str';
import BaikalNlp, { AnalyzeSentence } from './utils/BaikalNlp';
import { makePath } from './utils/str';
import { useEffect, useRef } from 'react';
import TmKor, { getFrameRequest } from './utils/tmkor/TmKor';
import { Task } from './store/features/tasks/taskAction';
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
      apiConfig.host = url.protocol + makePath(url.host, apiConfig.prefix);
    } catch (error) {
      console.error(error);
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
  task: Task,
): Promise<string | null> => {
  try {
    const baikalRes = await baikalNlp.analyze(task.sentence);
    const req: getFrameRequest = {
      sentence: task?.sentence,
      concepts:
        task?.edges?.concepts.map((c) => {
          return {
            stem: c.stem,
            postag: c.posttag,
          };
        }) || [],
      tagged: baikalRes?.sentences[0] as AnalyzeSentence,
      posLength: task.posLength,
      id: task.dataId,
      refSrc: task.refSrc,
      refId: task.refId,
      domain: task.domain,
    };
    const tmKorRes = await tmKor.getFrame([req]);
    if (tmKorRes) {
      return tmKorRes[0].frameText || null;
    }
  } catch (e) {
    return null;
  }

  return null;
};

export const checkSentencePattern = () => {
  return;
};

export const switchReviewStatus = switchRS;

export function usePrev<T>(value: T): T {
  const ref = useRef();

  useEffect(() => {
    ref.current = value as any;
  }, [value]);

  return ref.current as any;
}
