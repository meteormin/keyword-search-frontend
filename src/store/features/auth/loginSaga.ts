// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from 'store/features/common/loader';
import alertModalModule from 'store/features/common/alertModal';
import loginModule from 'store/features/auth';

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    yield put(loaderModule.endLoading());

    //yield put(loginModule.login({ token, user }));
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
