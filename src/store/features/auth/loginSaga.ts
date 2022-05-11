// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import loginModule from './index';
import { api } from '../../../helpers';
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
};

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    const { id, password } = action.payload;

    const response: ApiResponse = yield call(loginApi.login, id, password);

    if (response.isSuccess) {
      const token = response.res.data.token;
      const resUser = response.res.data.user;
      const user: LoginUser = toCamel(resUser) as LoginUser;

      yield put(loaderModule.endLoading());
      yield put(loginModule.login({ token, user }));
      yield call(() => (location.href = '/'));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '로그인 실패',
          message: response.res?.toString(),
        }),
      );
    }
  } catch (error) {
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

function* watchLoginSage() {
  yield takeLatest(loginModule.loginSubmit, loginApiSaga);
  yield takeLatest(loginModule.logout, logoutSaga);
}

export default function* loginSaga() {
  yield fork(watchLoginSage);
}
