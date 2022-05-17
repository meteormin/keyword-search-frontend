import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import sentenceModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel, toSnake } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateSentence, Sentence } from './sentenceAction';

const sentenceApi = {
  getSentenceList: async (limit: number, page: number) => {
    const url = `api/v1/sentences`;
    return await api()
      .withToken(auth.getToken() as string, 'bearer')
      .get(url, { limit: limit, page: page });
  },
  createSentence: async (sentence: CreateSentence) => {
    const url = `api/v1/sentences`;
    return await api()
      .withToken(auth.getToken() as string, 'bearer')
      .post(url, toSnake(sentence));
  },
};

function* getSentenceList(
  action: PayloadAction<{ limit: number; page: number }>,
) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      sentenceApi.getSentenceList,
      action.payload.limit,
      action.payload.page,
    );
    const res = apiResponse(response);
    console.log(response);
    if (response.isSuccess) {
      const sentences: Sentence[] = res.data.sentences.map(toCamel);
      yield put(loaderModule.endLoading());

      yield put(sentenceModule.actions.setCount(res.data.count || 0));
      yield put(sentenceModule.actions.setSentenceList(sentences));
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

function* createSentence(action: PayloadAction<CreateSentence>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      sentenceApi.createSentence,
      action.payload,
    );
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '검수 요청',
          message: '검수 요청 완료',
        }),
      );
    } else {
      yield put(loaderModule.endLoading());
      console.log(res);
      yield put(
        alertModalModule.showAlert({
          title: '검수 요청',
          message: '검수 요청 실패',
        }),
      );
    }
  } catch (e) {
    console.log(e);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '검수 요청',
        message: '검수 요청 실패',
      }),
    );
  }
}

function* watchSentenceSage() {
  yield takeLatest(sentenceModule.actions.getSentenceList, getSentenceList);
  yield takeLatest(sentenceModule.actions.createSentence, createSentence);
}

export default function* sentenceSage() {
  yield fork(watchSentenceSage);
}
