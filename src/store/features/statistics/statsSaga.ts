import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import statsModule from './index';
import { apiResponse, auth, date } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { SearchState } from '../search/searchAction';
import searchModule from '../search';
import { PayloadAction } from '@reduxjs/toolkit';
import newClient, { Clients } from '../../../utils/nia15/api';
import { StatsTask } from '../../../utils/nia15/interfaces/statics';
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

function* watchStatsSaga() {
  yield takeLatest(statsModule.actions.getTaskStats, getTaskStats);
  yield takeLatest(statsModule.actions.downloadTask, downloadTask);
}

export default function* statsSaga() {
  yield fork(watchStatsSaga);
}
