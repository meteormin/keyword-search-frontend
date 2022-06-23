import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import statsModule from './index';
import { apiResponse } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { SearchState } from '../search/searchAction';
import searchModule from '../search';
import { PayloadAction } from '@reduxjs/toolkit';
import newClient, { Clients } from '../../../utils/nia15/api';
import {
  StatsCreator,
  StatsReviewer,
  StatsTask,
} from '../../../utils/nia15/interfaces/statics';
import { StatsState } from './statsAction';

const statsApi = newClient(Clients.Statics);

function* getTaskStats() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      statsApi.task.getTaskStats,
      search.statsParameter || undefined,
    );
    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      const taskStats = toCamel(res.data) as StatsTask;
      console.log(res.data);

      yield put(statsModule.actions.setTaskStats(taskStats));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (err) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: err,
      }),
    );
  }
}

function* downloadTask() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      statsApi.task.download,
      search.statsParameter || undefined,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(statsModule.actions.setExcelFile(res));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (err) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '다운로드 실패',
        message: err,
      }),
    );
  }
}

function* getCreatorStats() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      statsApi.user.getCreatorStats,
      search.statsParameter || undefined,
    );
    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      const creatorStats = toCamel(res.data) as StatsCreator;
      console.log(res.data);

      yield put(statsModule.actions.setCreatorStats(creatorStats));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (err) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: err,
      }),
    );
  }
}

function* downloadCreator() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      statsApi.user.download,
      search.statsParameter || undefined,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(statsModule.actions.setExcelFile(res));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (err) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '다운로드 실패',
        message: err,
      }),
    );
  }
}

function* getReviewerStats(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      statsApi.user.getReviewerStats,
      action.payload,
      search.statsParameter || undefined,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      const reviewerStats = toCamel(res.data) as StatsReviewer;
      console.log(res.data);

      yield put(statsModule.actions.setReviewerStats(reviewerStats));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (err) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: err,
      }),
    );
  }
}

function* watchStatsSaga() {
  yield takeLatest(statsModule.actions.getTaskStats, getTaskStats);
  yield takeLatest(statsModule.actions.downloadTask, downloadTask);
  yield takeLatest(statsModule.actions.getCreatorStats, getCreatorStats);
  yield takeLatest(statsModule.actions.downloadCreator, downloadCreator);
  yield takeLatest(statsModule.actions.getReviewerStats, getReviewerStats);
}

export default function* statsSaga() {
  yield fork(watchStatsSaga);
}
