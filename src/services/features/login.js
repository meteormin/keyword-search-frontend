import { createSlice } from '@reduxjs/toolkit';
import { auth, api } from '../../helpers';
import { showAlert } from './alertModal';
import { startLoading, endLoading } from './loader';
import { put, call, takeEvery } from 'redux-saga/effects';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    id: null,
    password: null,
    user: null,
    token: null,
  },
  reducers: {
    setLoginId: (state, action) => {
      state.id = action.payload;
    },
    setLoginPass: (state, action) => {
      state.password = action.payload;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      auth.setToken(state.token);
      auth.setUser(state.user);
    },
    loginSubmit: (state, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
  },
});

export const { setLoginId, setLoginPass, login, loginSubmit } =
  loginSlice.actions;

export const selectLoginState = (state) => state.login;

export default loginSlice.reducer;

// logic
const loginApi = async (id, password) => {
  const client = api();

  await client.post('login', {
    id: id,
    password: password,
  });

  return client;
};

// sage
function* loginApiSaga(action) {
  yield put(startLoading());

  try {
    const { id, password } = action.payload;

    /** @var {ApiClient} client **/
    const client = yield call(loginApi, id, password);

    if (client.isSuccess() && !client.error) {
      const token = client.response.data.token;
      const user = client.response.data.user;

      yield put(endLoading());
      yield put(login({ token: token, user: user }));
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
  yield takeEvery(loginSubmit(), loginApiSaga);
}
