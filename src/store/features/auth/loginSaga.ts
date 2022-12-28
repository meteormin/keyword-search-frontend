// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from 'store/features/common/loader';
import alertModalModule from 'store/features/common/alertModal';
import loginModule from 'store/features/auth';
import makeClient from 'api';
import AuthClient, { TokenRes } from 'api/clients/Auth';
import { tokenInfo, Tokens, User } from 'utils/auth';
import { AuthUser } from 'api/interfaces/Auth';

const client = makeClient<AuthClient>(AuthClient);

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderModule.startLoading());

  try {
    const loginParam = {
      username: action.payload.id,
      password: action.payload.password,
    };

    const tokenRes: TokenRes = yield call(client.token, loginParam);
    yield put(loaderModule.endLoading());

    const tokenInfoObj = tokenInfo(tokenRes.token);

    const tokens: Tokens = {
      accessToken: { token: tokenRes.token, tokenType: 'bearer' },
      expiresIn: tokenInfoObj?.exp || 0,
    };

    const authUser: AuthUser = yield call(client.me);
    const user: User = {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
      role: authUser.role,
      groupId: authUser.groupId,
      createdAt: authUser.createdAt,
      updatedAt: authUser.createdAt,
    };

    yield put(loginModule.login({ token: tokens, user: user }));
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
