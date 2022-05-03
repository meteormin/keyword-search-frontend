import { all, call } from 'redux-saga/effects';
import loginSaga from '../sagas/auth/login';

export default function* rootSaga() {
  yield all([call(loginSaga)]);
}
