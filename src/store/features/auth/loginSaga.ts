// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import loginModule from './index';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { LoginUser } from './loginAction';
import { toCamel } from 'snake-camel';

export const loginApi = {
  // logic
  login: async (id: string, password: string): Promise<ApiResponse> => {
    const client = api();

    return await client.post('api/v1/auth/login', {
      id: id,
      password: password,
    });
  },
  me: async (token: string): Promise<ApiResponse> => {
    const client = api();

    return await client.withToken(token, 'bearer').get('api/v1/users/me');
  },
};

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    const { id, password } = action.payload;

    const response: ApiResponse = yield call(loginApi.login, id, password);

    const res = apiResponse(response);
    if (response.isSuccess) {
      const token = res.token;
      console.log(token);
      const userRes: ApiResponse = yield call(loginApi.me, token.Access);
      console.log(userRes);
      const resUser = apiResponse(userRes).data.user;
      const user: LoginUser = toCamel(resUser) as LoginUser;

      yield put(loaderModule.endLoading());
      yield put(loginModule.login({ token, user }));
      yield call(() => (location.href = '/'));
    } else {
      console.log(res);
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '로그인 실패',
          message: '아이디 또는 비밀번호가 틀렸습니다.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({ title: '로그인 실패', message: error }),
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
