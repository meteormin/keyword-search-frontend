import * as Auth from 'utils/auth';
import Config from 'config';
import HiddenByRole from 'utils/HiddenByRole';
import Restricted from 'utils/Restricted';
import Protected from 'utils/Protected';
import moment from 'moment';
import 'moment/locale/ko';
import Lang from 'assets/lang';
import * as Str from 'utils/str';
import * as Arr from 'utils/arr';
import { useEffect, useRef } from 'react';
import makeClient from 'api';
import clients from 'api/clients';
import { ApiResponse } from './api/base/ApiClient';

export const config = Config();
export const auth = Auth;

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
    const reportApi = makeClient(clients.Report);
    return await reportApi.report(r);
  } catch (e) {
    console.error(e);
    return null;
  }
};
