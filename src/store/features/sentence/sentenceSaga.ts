import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import sentenceModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from './sentenceAction';

const sentenceApi = {
  getTaskList: async (limit: number, page: number) => {
    const url = `/api/v1/tasks/assigned`;
    return await api()
      .withToken(auth.getToken() as string, 'bearer')
      .get(url, { limit: limit, page: page });
  },
};

function* getTaskList(action: PayloadAction<{ limit: number; page: number }>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      sentenceApi.getTaskList,
      action.payload.limit,
      action.payload.page,
    );
    const res = apiResponse(response);
    console.log(response);
    if (response.isSuccess) {
      const tasks: Task[] = res.data.tasks.map(toCamel);
      yield put(loaderModule.endLoading());

      yield put(sentenceModule.actions.setTaskList(tasks));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: e,
      }),
    );
  }
}

function* watchSentenceSage() {
  yield takeLatest(sentenceModule.actions.getTaskList, getTaskList);
}

export default function* sentenceSage() {
  yield fork(watchSentenceSage);
}
