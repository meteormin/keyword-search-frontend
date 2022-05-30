import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import sentenceModule from './';
import { api, apiResponse, auth, switchReviewStatus } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateSentence, Sentence, SentenceHistory } from './sentenceAction';
import { SearchParameter, SearchState } from '../search/searchAction';
import searchModule from '../search';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const sentenceApi = {
  getSentenceList: async (
    limit: number,
    page: number,
    search?: SearchParameter,
  ) => {
    const url = `api/v1/sentences`;
    const parameters: any = { ...search };
    parameters.limit = limit;
    parameters.page = page;
    return await apiClient.get(url, parameters);
  },
  getSentence: async (id: number) => {
    return await apiClient.get(`api/v1/sentences/${id}`);
  },
  createSentence: async (sentence: CreateSentence) => {
    const url = `api/v1/sentences`;
    return await apiClient.post(url, sentence);
  },
  createTempSentence: async (sentence: CreateSentence) => {
    return await apiClient.post('api/v1/sentences/temp', sentence);
  },
};

function* getSentenceList(
  action: PayloadAction<{ limit: number; page: number }>,
) {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);

  try {
    const response: ApiResponse = yield call(
      sentenceApi.getSentenceList,
      action.payload.limit,
      action.payload.page,
      search.parameters || undefined,
    );
    const res = apiResponse(response);
    console.log(response);
    if (response.isSuccess) {
      const sentences: SentenceHistory[] = res.data.sentences.map(toCamel);
      yield put(loaderModule.endLoading());

      yield put(sentenceModule.actions.setCount(res.data.count || 0));
      // yield put(sentenceModule.actions.setSentenceList(sentences));
      const sentenceHistory: SentenceHistory[] = sentences.map((s) => {
        const sh: SentenceHistory = s;

        if (sh.reviewResult) {
          const { reviewStatus, createStatus } = switchReviewStatus(
            sh.reviewResult,
          );
          sh.reviewRsTxt = reviewStatus;
          sh.createState = createStatus;
        }
        return sh;
      });

      yield put(sentenceModule.actions.setSentenceHistories(sentenceHistory));
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
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

function* getSentence(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      sentenceApi.getSentence,
      action.payload,
    );
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const sentence: Sentence = toCamel(res.data.sentence) as Sentence;
      yield put(sentenceModule.actions.setSentence(sentence));
    } else {
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회',
        message: '데이터 조회 실패',
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
          refresh: true,
        }),
      );
    } else {
      yield put(loaderModule.endLoading());
      console.log(res);
      yield put(
        alertModalModule.errorAlert({
          res: res,
          refresh: true,
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
        refresh: true,
      }),
    );
  }
}

function* createTemp(action: PayloadAction<CreateSentence>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      sentenceApi.createTempSentence,
      action.payload,
    );
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '임시 저장',
          message: '임시 저장 완료',
          refresh: true,
        }),
      );
    } else {
      yield put(loaderModule.endLoading());
      console.log(res);
      yield put(
        alertModalModule.errorAlert({
          res: res,
          refresh: true,
        }),
      );
    }
  } catch (e) {
    console.log(e);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '임시 저장',
        message: '임시 저장 실패',
        refresh: true,
      }),
    );
  }
}

function* watchSentenceSage() {
  yield takeLatest(sentenceModule.actions.getSentenceList, getSentenceList);
  yield takeLatest(sentenceModule.actions.getSentence, getSentence);
  yield takeLatest(sentenceModule.actions.createSentence, createSentence);
  yield takeLatest(sentenceModule.actions.createTempSentence, createTemp);
}

export default function* sentenceSage() {
  yield fork(watchSentenceSage);
}
