// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderStore from 'store/features/common/loader';
import alertModalStore from 'store/features/common/alertModal';
import loginStore from 'store/features/auth';
import makeClient, { isErrorResponse } from 'api';
import AuthClient, { TokenRes } from 'api/clients/Auth';
import { tokenInfo, Tokens, User } from 'utils/auth';
import { AuthUser } from 'api/interfaces/Auth';
import { ErrorResInterface, ErrorResponse } from 'api/base/ApiClient';

const client = makeClient<AuthClient>(AuthClient);

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
  yield put(loaderStore.startLoading());

  try {
    const loginParam = {
      username: action.payload.id,
      password: action.payload.password,
    };

    const res: TokenRes | ErrorResInterface | null = yield call(
      client.token,
      loginParam,
    );

    yield put(loaderStore.endLoading());

    if (isErrorResponse(res)) {
      const err = res as ErrorResponse;
      yield put(
        alertModalStore.errorAlert({
          res: err.serialize(),
          fallback: {
            title: '로그인',
            message: '아이디 또는 비밀번화 틀렸습니다.',
          },
        }),
      );
      return;
    }

    const tokenRes: TokenRes = res as TokenRes;

    const tokenInfoObj = tokenInfo(tokenRes.token);

    const tokens: Tokens = {
      accessToken: { token: tokenRes.token, tokenType: 'bearer' },
      expiresIn: tokenInfoObj?.exp || 0,
    };

    const authUser: AuthUser = yield call(client.me, tokens.accessToken);
    const user: User = {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
      role: authUser.role,
      groupId: authUser.groupId,
      createdAt: authUser.createdAt,
      updatedAt: authUser.createdAt,
    };

    yield put(loginStore.login({ token: tokens, user: user }));
  } catch (error) {
    yield put(loaderStore.endLoading());
    let err = error;
    if (isErrorResponse(error)) {
      err = (error as ErrorResponse).serialize();
    }
    yield put(
      alertModalStore.errorAlert({
        res: err,
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
  yield takeLatest(loginStore.loginSubmit, loginApiSaga);
  yield takeLatest(loginStore.logout, logoutSaga);
}

export default function* loginSaga() {
  yield fork(watchLoginSaga);
}
