import { createSlice } from '@reduxjs/toolkit';
import { auth, api } from '../../helpers';
import { showAlert } from './alertModal';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      auth.setToken(state.token);
      auth.setUser(state.user);
    },
  },
});

export const { login } = loginSlice.actions;

export const loginApi = (id, password) => async (dispatch) => {
  const client = api();

  const res = await client.post('login', {
    id: id,
    password: password,
  });

  if (client.isSuccess()) {
    const user = res.user;
    const token = res.token;
    dispatch(
      login({
        user: user,
        token: token,
      }),
    );
  }

  dispatch(showAlert({ title: '로그인 실패', message: client.error }));
};

export default loginSlice.reducer;
