import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import taskModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from './taskAction';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const taskApi = {
  assign: async () => {
    return await apiClient.post('api/v1/tasks/assign');
  },
  getTaskList: async (limit: number, page: number) => {
    const url = `api/v1/tasks/assigned`;
    return await apiClient.get(url, { limit: limit, page: page });
  },
};

function* getTaskList(action: PayloadAction<{ limit: number; page: number }>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      taskApi.getTaskList,
      action.payload.limit,
      action.payload.page,
    );
    const res = apiResponse(response);
    console.log(response);
    if (response.isSuccess) {
      const count: number = res.data.count;
      const tasks: Task[] = res.data.tasks.map(toCamel);
      yield put(loaderModule.endLoading());

      yield put(taskModule.actions.setCount(count));
      yield put(taskModule.actions.setTaskList(tasks));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (error) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: error,
      }),
    );
  }
}

function* assign() {
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(taskApi.assign);
    yield put(loaderModule.endLoading());
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(taskModule.actions.getTaskList({ limit: 10, page: 1 }));
      yield put(
        alertModalModule.showAlert({
          title: '할당 완료',
          message: '할당 완료',
          refresh: true,
        }),
      );
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
          refresh: true,
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModalModule.showAlert({
        title: '할당 실패',
        message: '할당 실패',
        refresh: true,
      }),
    );
  }
}

function* watchTaskSage() {
  yield takeLatest(taskModule.actions.getTaskList, getTaskList);
  yield takeLatest(taskModule.actions.assign, assign);
}

export default function* taskSage() {
  yield fork(watchTaskSage);
}
