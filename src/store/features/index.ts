// import reducers
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import loaderReducer from 'store/features/common/loader/loaderReducer';
import loginReducer from 'store/features/auth/loginReducer';
import alertModalReducer from 'store/features/common/alertModal/alertModalReducer';
import loginSaga from 'store/features/auth/loginSaga';

export const rootReducer = combineReducers({
  // reducers
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([call(loginSaga)]);
};
