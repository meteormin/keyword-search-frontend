// import reducers
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import loaderReducer from './common/loader/loaderReducer';
import loginReducer from './auth/loginReducer';
import alertModalReducer from './common/alertModal/alertModalReducer';
import loginSaga from './auth/loginSaga';
import usersReducer from './users/usersReducer';
import usersSaga from './users/usersSaga';
import sentenceSage from './sentence/sentenceSaga';
import sentenceReducer from './sentence/sentenceReducer';

export const rootReducer = combineReducers({
  // reducers
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
  users: usersReducer,
  sentence: sentenceReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([call(loginSaga), call(usersSaga), call(sentenceSage)]);
};
