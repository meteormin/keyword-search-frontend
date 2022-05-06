// sage
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { loaderModule } from '../common/loader/loaderReducer';
import { alertModalModule } from '../common/alertModal/alertModalReducer';
import { loginModule } from './loginReducer';

export const loginApi = {
  // logic
  login: async (id: string, password: string): Promise<any> => {
    // const client = api();

    // await client.post('login', {
    //   id: id,
    //   password: password,
    // });
    // return client;
    return await new Promise((resolve) => {
      setTimeout(() => {
        if (id === 'root' && password === 'root') {
          resolve({
            token: 'access_token',
            user: {
              id: 1,
              name: 'user',
              role: 1,
            },
          });
        }
        resolve({ error: 'error' });
      }, 3000);
    });
  },
};

function* loginApiSaga(action: {
  payload: { id: string; password: string };
}): Generator<any> {
  yield put(loaderModule.startLoading());

  try {
    const { id, password } = action.payload;

    const client: any = yield call(loginApi.login, id, password);

    // if (client.isSuccess() && !client.error) {
    //   const token = client.response.data.token;
    //   const user = client.response.data.user;
    if (
      Object.prototype.hasOwnProperty.call(client, 'token') &&
      Object.prototype.hasOwnProperty.call(client, 'user')
    ) {
      const token = client.token;
      const user = client.user;
      yield put(loaderModule.endLoading());
      yield put(loginModule.login({ token, user }));
      yield call(() => (location.href = '/'));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '로그인 실패',
          message: client.error,
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

function* watchLoginSage() {
  yield takeLatest(loginModule.loginSubmit, loginApiSaga);
}

export default function* loginSaga() {
  yield all([fork(watchLoginSage)]);
}
