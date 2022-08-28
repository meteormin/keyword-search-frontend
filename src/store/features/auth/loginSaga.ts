// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import loginModule from './index';
import { apiResponse } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { LoginUser } from './loginAction';
import { toCamel } from 'snake-camel';
import newClient, { Clients } from '../../../utils/nia153/api';
import {
  PasswordGrantType,
  Tokens,
} from '../../../utils/nia153/interfaces/oauth';
import { config } from '../../../helpers';

const loginApi = newClient(Clients.Oauth);
const userApi = newClient(Clients.Users);

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    const { id, password } = action.payload;
    const passwordGrant: PasswordGrantType = {
      grantType: 'password',
      clientId: config.api.default.clientId || '',
      clientSecret: config.api.default.clientSecret || '',
      username: id,
      password: password,
    };

    const response: ApiResponse = yield call(loginApi.token, passwordGrant);

    const res = apiResponse(response);
    yield put(loaderModule.endLoading());

    if (response.isSuccess) {
      const token: Tokens = toCamel(res) as Tokens;
      const userRes: ApiResponse = yield call(
        userApi.me,
        `${token.tokenType} ${token.accessToken}`,
      );

      const resUser = apiResponse(userRes);
      const user: LoginUser = toCamel(resUser) as LoginUser;

      yield put(loginModule.login({ token, user }));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
          fallback: {
            title: '로그인',
            message: '아이디 또는 비밀번화 틀렸습니다.',
          },
        }),
      );
    }
  } catch (error) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.errorAlert({
        res: error,
        fallback: {
          title: '로그인',
          message: '아이디 또는 비밀번화 틀렸습니다.',
        },
      }),
    );
  }
}

function* logoutSaga() {
  yield call(() => {
    location.href = '/login';
  });
}

function* watchLoginSaga() {
  yield takeLatest(loginModule.loginSubmit, loginApiSaga);
  yield takeLatest(loginModule.logout, logoutSaga);
}

export default function* loginSaga() {
  yield fork(watchLoginSaga);
}
