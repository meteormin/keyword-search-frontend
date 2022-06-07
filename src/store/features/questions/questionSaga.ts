import { CreateQuestion, Questions, QuestionSearch } from './questionAction';
import { api, apiResponse, auth } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest, fork, select } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import { ApiResponse } from '../../../utils/ApiClient';
import questionModule from './index';
import alertModal from '../common/alertModal';

const apiClient = api({
  prefix: 'api/v1/questions',
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const questionApi = {
  getList: async (search: QuestionSearch) => {
    return await apiClient.get('/', search);
  },
  getById: async (id: number) => {
    return await apiClient.get(`${id}`);
  },
  getFile: async (id: number) => {
    return await apiClient.get(`${id}/file`);
  },
  create: async (question: CreateQuestion) => {
    return await apiClient.post('/', question);
  },
  reply: async (questionId: number, reply: string) => {
    return await apiClient.post(`${questionId}`, { content: reply });
  },
};

function* getList() {
  yield put(loaderModule.startLoading());
  const { search }: { search: QuestionSearch } = yield select(
    questionModule.getQuestionState,
  );

  try {
    const response: ApiResponse = yield call(questionApi.getList, search);

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      const questionList: Questions[] = res.data.questions;
      const count = res.data.count;
      yield put(questionModule.actions.setCount(count));
      yield put(questionModule.actions.setList(questionList));
    } else {
      yield put(
        alertModal.showAlert({
          title: '데이터 조회 실패',
          message: '데이터 조회 실패',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModal.showAlert({
        title: '데이터 조회 실패',
        message: '데이터 조회 실패',
      }),
    );
  }
}

function* getById(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      questionApi.getById,
      action.payload,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      yield put(questionModule.actions.setEdit(res.data.question));
    } else {
      yield put(
        alertModal.showAlert({
          title: '데이터 조회 실패',
          message: '데이터 조회 실패',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModal.showAlert({
        title: '데이터 조회 실패',
        message: '데이터 조회 실패',
      }),
    );
  }
}

function* create(action: PayloadAction<CreateQuestion>) {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      questionApi.create,
      action.payload,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      yield put(questionModule.actions.getList());
      yield put(
        alertModal.showAlert({
          title: '문의 요청',
          message: '정상적으로 요청 되었습니다.',
        }),
      );
    } else {
      yield put(
        alertModal.showAlert({
          title: '문의 요청',
          message: '요청 실패',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModal.showAlert({
        title: '문의 요청',
        message: '요청 실패',
      }),
    );
  }
}

function* reply(
  action: PayloadAction<{ questionId: number; content: string }>,
) {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      questionApi.reply,
      action.payload.questionId,
      action.payload.content,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      yield put(questionModule.actions.getList());
      yield put(
        alertModal.showAlert({
          title: '문의 답변',
          message: '답변 완료',
        }),
      );
    } else {
      yield put(
        alertModal.showAlert({
          title: '문의 답변',
          message: '답변 실패',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModal.showAlert({
        title: '문의 답변',
        message: '답변 실패',
      }),
    );
  }
}

function* watchQuestionSaga() {
  yield takeLatest(questionModule.actions.getList, getList);
  yield takeLatest(questionModule.actions.getById, getById);
  yield takeLatest(questionModule.actions.create, create);
  yield takeLatest(questionModule.actions.reply, reply);
}

export default function* questionSage() {
  yield fork(watchQuestionSaga);
}
