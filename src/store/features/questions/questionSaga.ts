import {
  CreateQuestion,
  Question,
  Questions,
  QuestionSearch,
} from '../../../utils/nia15/interfaces/questions';
import { apiResponse } from '../../../helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest, fork, select } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import { ApiResponse } from '../../../utils/ApiClient';
import questionModule from './index';
import alertModal from '../common/alertModal';
import { toCamel } from 'snake-camel';
import newClient, { Clients } from '../../../utils/nia15/api';

const questionApi = newClient(Clients.Questions);

function* getList() {
  yield put(loaderModule.startLoading());
  const { search, isAdmin }: { search: QuestionSearch; isAdmin: boolean } =
    yield select(questionModule.getQuestionState);

  try {
    const response: ApiResponse = yield call(
      questionApi.getList,
      search,
      isAdmin,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      const questionList: Questions[] = res.data.questions.map(toCamel);
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
      yield put(
        questionModule.actions.setEdit(toCamel(res.data.question) as Question),
      );
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

  const { search, isAdmin }: { search: QuestionSearch; isAdmin: boolean } =
    yield select(questionModule.getQuestionState);
  try {
    const response: ApiResponse = yield call(
      questionApi.reply,
      action.payload.questionId,
      action.payload.content,
    );

    yield put(loaderModule.endLoading());

    const res = apiResponse(response);

    if (response.isSuccess) {
      if (search || isAdmin) {
        yield put(questionModule.actions.getList());
      }
      yield put(questionModule.actions.setEdit(null));
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

function* getFileById(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      questionApi.getFile,
      action.payload,
    );
    yield put(loaderModule.endLoading());
    
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(questionModule.actions.setFile(res));
    } else {
      yield put(
        alertModal.showAlert({
          title: '파일 다운로드',
          message: '파일 다운르도 실패',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModal.showAlert({
        title: '파일 다운로드',
        message: '파일 다운르도 실패',
      }),
    );
  }
}

function* watchQuestionSaga() {
  yield takeLatest(questionModule.actions.getList, getList);
  yield takeLatest(questionModule.actions.getById, getById);
  yield takeLatest(questionModule.actions.getFileById, getFileById);
  yield takeLatest(questionModule.actions.create, create);
  yield takeLatest(questionModule.actions.reply, reply);
}

export default function* questionSage() {
  yield fork(watchQuestionSaga);
}
