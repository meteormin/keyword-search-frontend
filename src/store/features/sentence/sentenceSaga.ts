import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import sentenceModule from './';
import { apiResponse, switchReviewStatus } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateSentence,
  Sentence,
  SentenceHistory,
} from '../../../utils/nia15/interfaces/sentences';
import { SearchState } from '../search/searchAction';
import searchModule from '../search';
import newClient, { Clients } from '../../../utils/nia15/api';

const sentenceApi = newClient(Clients.Sentences);

function* getSentenceList() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);

  try {
    const response: ApiResponse = yield call(
      sentenceApi.getSentenceList,
      search.parameters || undefined,
    );
    const res = apiResponse(response);
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
      yield put(sentenceModule.actions.setSentence(null));
      yield put(
        alertModalModule.showAlert({
          title: '검수 요청',
          message: '검수 요청 완료',
          refresh: false,
        }),
      );
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
          refresh: true,
        }),
      );
    }
  } catch (e) {
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
      yield put(sentenceModule.actions.getSentenceList());
      yield put(
        alertModalModule.showAlert({
          title: '임시 저장',
          message: '임시 저장 완료',
          refresh: false,
        }),
      );
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
          refresh: true,
        }),
      );
    }
  } catch (e) {
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
