import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import taskModule from './';
import { api, apiResponse, auth, date } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { Task } from './taskAction';
import { UserType } from '../../../config/UserType';
import { SearchParameter, SearchState } from '../search/searchAction';
import searchModule from '../search';
import { PayloadAction } from '@reduxjs/toolkit';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const taskApi = {
  assign: async (search?: SearchParameter) => {
    return await apiClient.post('api/v1/tasks/assign', search);
  },
  getTaskList: async (search?: SearchParameter) => {
    const url = `api/v1/tasks/assigned`;
    return await apiClient.get(url, search);
  },
  getTask: async (taskId: number) => {
    return await apiClient.get(`api/v1/tasks/${taskId}`);
  },
  getExpiredAt: async () => {
    return await apiClient.get('api/v1/tasks/assign/expiredAt');
  },
};

function* getTaskList() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    const response: ApiResponse = yield call(
      taskApi.getTaskList,
      search.parameters || undefined,
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
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      taskApi.assign,
      search.parameters || undefined,
    );

    yield put(loaderModule.endLoading());
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(taskModule.actions.getTaskList());
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

function* getTask(action: PayloadAction<number>) {
  const taskId = action.payload;
  try {
    const response: ApiResponse = yield call(taskApi.getTask, taskId);
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const workTask: Task = toCamel(res.data.task) as Task;
      yield put(taskModule.actions.setWorkTask(workTask));
    } else {
      yield put(alertModalModule.errorAlert(res));
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

function* getTime() {
  const { taskList } = yield select(taskModule.getTaskState);
  if (taskList.length == 0) {
    return;
  }
  try {
    const now = date();
    console.log(auth.getJobTimeAt(UserType.WORKER));
    if (auth.getJobTimeAt(UserType.WORKER)) {
      const time = date
        .duration(auth.getJobTimeAt(UserType.WORKER)?.diff(now))
        .asMilliseconds();
      yield put(taskModule.actions.setTime(date.utc(time).format('HH:mm:ss')));
    } else {
      const response: ApiResponse = yield call(taskApi.getExpiredAt);
      const res = apiResponse(response);
      if (response.isSuccess) {
        const expiredAt = date(res.data.expired_at);
        auth.setJobTimeAt(UserType.WORKER, res.data.expired_at);
        const time = date.duration(expiredAt.diff(now)).asMilliseconds();
        yield put(
          taskModule.actions.setTime(date.utc(time).format('HH:mm:ss')),
        );
      } else {
        console.log(res);
        yield put(taskModule.actions.getTaskList());
        yield put(
          alertModalModule.showAlert({
            title: '진행 가능 시간 초과',
            message: '진행 가능 시간이 초과 되었습니다.',
            refresh: true,
          }),
        );
      }
    }
  } catch (e) {
    console.log(e);
    yield put(
      alertModalModule.showAlert({
        title: '진행 불가능',
        message: '진행 시간을 가져올 수 없습니다.',
        refresh: true,
      }),
    );
  }
}

function* watchTaskSage() {
  yield takeLatest(taskModule.actions.getTaskList, getTaskList);
  yield takeLatest(taskModule.actions.getWorkTask, getTask);
  yield takeLatest(taskModule.actions.assign, assign);
  yield takeLatest(taskModule.actions.getExpiredAt, getTime);
}

export default function* taskSage() {
  yield fork(watchTaskSage);
}
