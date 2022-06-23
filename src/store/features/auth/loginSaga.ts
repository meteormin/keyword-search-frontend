// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import loginModule from './index';
import { apiResponse } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { LoginUser } from './loginAction';
import { toCamel } from 'snake-camel';
import newClient, { Clients } from '../../../utils/nia15/api';

const loginApi = newClient(Clients.Auth);

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    const { id, password } = action.payload;

    const response: ApiResponse = yield call(loginApi.login, id, password);

    const res = apiResponse(response);
    if (response.isSuccess) {
      const token = res.token;
      const userRes: ApiResponse = yield call(loginApi.me, token.Access);
      const resUser = apiResponse(userRes).data.user;
      const user: LoginUser = toCamel(resUser) as LoginUser;

      yield put(loaderModule.endLoading());
      yield put(loginModule.login({ token, user }));
      yield call(() => (location.href = '/'));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '로그인 실패',
          message: '아이디 또는 비밀번호가 틀렸습니다.',
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

function* watchLoginSaga() {
  yield takeLatest(loginModule.loginSubmit, loginApiSaga);
  yield takeLatest(loginModule.logout, logoutSaga);
}

export default function* loginSaga() {
  yield fork(watchLoginSaga);
}
