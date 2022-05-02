// import features
import { combineReducers } from 'redux';
import counterReducer from './counter';
import loaderReducer from './loader';
import loginReducer, { loginSage } from './login';
import alertModalReducer from './alertModal';
import { fork, all } from 'redux-saga/effects';

export default combineReducers({
  // features
  counter: counterReducer,
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
});

export function* rootSaga() {
  yield all([fork(loginSage)]);
}
