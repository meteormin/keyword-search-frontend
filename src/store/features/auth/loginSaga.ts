// sage
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loginStore from 'store/features/auth';
import makeClient from 'api';
import AuthClient, { TokenRes } from 'api/clients/Auth';
import { tokenInfo, Tokens, User } from 'utils/auth';
import { AuthUser } from 'api/interfaces/Auth';
import { ApiResponse, ErrorResInterface } from 'api/base/ApiClient';
import { putEndLoading, putErrorAlert, putStartLoading } from 'store/features';

const client = makeClient<AuthClient>(AuthClient);

function* loginApiSaga(action: { payload: { id: string; password: string } }) {
    yield putStartLoading();

    try {
        const loginParam = {
            username: action.payload.id,
            password: action.payload.password,
        };

        const res: ApiResponse<TokenRes | ErrorResInterface> = yield call(
            client.token,
            loginParam,
        );

        yield putEndLoading();

        if (!res.isSuccess) {
            yield putErrorAlert(
                res.data,
                '로그인',
                '아이디 또는 비밀번호가 틀렸습니다.',
            );
            return;
        }

        const tokenRes: TokenRes = res.data as TokenRes;

        const tokenInfoObj = tokenInfo(tokenRes.token);

        const tokens: Tokens = {
            accessToken: { token: tokenRes.token, tokenType: 'bearer' },
            expiresIn: tokenInfoObj?.expiresIn || 0,
        };

        const getMe: ApiResponse<AuthUser | ErrorResInterface> = yield call(
            client.me,
            tokens.accessToken,
        );

        const authUser = getMe.data as AuthUser;
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
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(
            err,
            '로그인',
            '아이디 또는 비밀번호가 틀렸습니다.',
        );
    }
}

function* logoutSaga() {
    yield call(client.revoke);
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
