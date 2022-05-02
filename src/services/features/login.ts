import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../helpers';
import { showAlert } from './alertModal';
import { endLoading, startLoading } from './loader';
import { call, put, takeLatest } from 'redux-saga/effects';

export interface LoginUser {
  id: number | string;
}

export interface LoginState {
  id: string | null;
  password: string | null;
  user: LoginUser | null;
  token: string | null;
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: null,
    password: null,
    user: null,
    token: null,
  },
  reducers: {
    setLoginId: (state: LoginState, action) => {
      state.id = action.payload;
    },
    setLoginPass: (state: LoginState, action) => {
      state.password = action.payload;
    },
    login: (state: LoginState, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      if (state.token != null) {
        auth.setToken(state.token);
      }

      if (state.user != null) {
        auth.setUser(state.user);
      }
    },
    loginSubmit: (state: LoginState, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
  },
});

export const { setLoginId, setLoginPass, login, loginSubmit } =
  loginSlice.actions;

export const selectLoginState = (state: any) => state.login;

export default loginSlice.reducer;

// logic
const loginApi = async (id: string, password: string): Promise<any> => {
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
};

// sage
function* loginApiSaga(action: {
  payload: { id: string; password: string };
}): Generator<any> {
  yield put(startLoading());

  try {
    const { id, password } = action.payload;

    const client: any = yield call(loginApi, id, password);

    // if (client.isSuccess() && !client.error) {
    //   const token = client.response.data.token;
    //   const user = client.response.data.user;
    if (
      Object.prototype.hasOwnProperty.call(client, 'token') &&
      Object.prototype.hasOwnProperty.call(client, 'user')
    ) {
      const token = client.token;
      const user = client.user;
      yield put(endLoading());
      yield put(login({ token, user }));
    } else {
      yield put(endLoading());
      yield put(showAlert({ title: '로그인 실패', message: client.error }));
    }
  } catch (error) {
    yield put(endLoading());
    yield put(showAlert({ title: '로그인 실패', message: error }));
  }
}

export function* loginSage() {
  yield takeLatest(loginSubmit, loginApiSaga);
}
