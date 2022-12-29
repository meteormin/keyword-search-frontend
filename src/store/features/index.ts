// import reducers
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import loaderReducer from 'store/features/common/loader/loaderReducer';
import loginReducer from 'store/features/auth/loginReducer';
import alertModalReducer from 'store/features/common/alertModal/alertModalReducer';
import loginSaga from 'store/features/auth/loginSaga';
import hostsReducer from 'store/features/hosts/reducer';
import hostSaga from 'store/features/hosts/saga';

export const rootReducer = combineReducers({
  // reducers
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
  hosts: hostsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([call(loginSaga), call(hostSaga)]);
};
