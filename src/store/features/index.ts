// import reducers
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import loaderReducer from './common/loader/loaderReducer';
import loginReducer from './auth/loginReducer';
import alertModalReducer from './common/alertModal/alertModalReducer';
import loginSaga from './auth/loginSaga';
import usersReducer from './users/userReducer';
import usersSaga from './users/userSaga';
import sentenceSage from './sentence/sentenceSaga';
import sentenceReducer from './sentence/sentenceReducer';
import taskSaga from './tasks/taskSaga';
import taskReducer from './tasks/taskReducer';
import reviewReducer from './reviews/reviewReducer';
import reviewSage from './reviews/reviewSaga';
import searchReducer from './search/searchReducer';
import searchSaga from './search/searchSaga';
import questionReducer from './questions/questionReducer';
import questionSaga from './questions/questionSaga';
import statsReducer from './statistics/statsReducer';
import statsSaga from './statistics/statsSaga';
import scoreReducer from './scores/scoreReducer';
import scoreSaga from './scores/scoreSaga';

export const rootReducer = combineReducers({
  // reducers
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
  users: usersReducer,
  task: taskReducer,
  sentence: sentenceReducer,
  review: reviewReducer,
  search: searchReducer,
  question: questionReducer,
  statistics: statsReducer,

  // 15-3
  scores: scoreReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([
    call(loginSaga),
    call(usersSaga),
    call(taskSaga),
    call(sentenceSage),
    call(reviewSage),
    call(searchSaga),
    call(questionSaga),
    call(statsSaga),
    call(scoreSaga),
  ]);
};
