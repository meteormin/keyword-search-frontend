import { createSlice } from '@reduxjs/toolkit';
import { auth, api } from '../../helpers';

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
      auth.setToken();
      auth.setUser(state.user);
    },
  },
});

export const { login } = loginSlice.actions;

export const loginApi = (id, password) => async (dispatch) => {
  const res = await api.post('login', {
    id: id,
    password: password,
  });

  if (api.isSuccess()) {
    const user = res.user;
    const token = res.token;
    dispatch(
      login({
        user: user,
        token: token,
      }),
    );
  }
};

export default loginSlice.reducer;
