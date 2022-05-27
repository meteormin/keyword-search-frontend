import { apiResponse, api, auth, lang } from '../../../helpers';
import {
  CreateReview,
  Review,
  UpdateReview,
  SentenceReview,
} from './reviewAction';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest, fork, select } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import { ApiResponse } from '../../../utils/ApiClient';
import reviewModule from './index';
import alertModal from '../common/alertModal';
import alertModalModule from '../common/alertModal';
import { toCamel } from 'snake-camel';
import { SearchParameter, SearchState } from '../search/searchAction';
import searchModule from '../search';
import { Sentence } from '../sentence/sentenceAction';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const reviewApi = {
  assign: async (seq: number) => {
    return await apiClient.post(`api/v1/reviews/${seq}/assign`);
  },
  getAssignList: async (
    seq: number,
    limit: number,
    page: number,
    search?: SearchParameter,
  ) => {
    const parameters: any = { ...search };
    parameters.limit = limit;
    parameters.page = page;
    return await apiClient.get(`api/v1/reviews/${seq}/assigned`, parameters);
  },
  getAssign: async (seq: number, assignId: number) => {
    return await apiClient.get(`api/v1/sentences/${assignId}`);
  },
  getReviewList: async (
    seq: number,
    limit: number,
    page: number,
    search?: SearchParameter,
  ) => {
    const parameters: any = { ...search };
    parameters.limit = limit;
    parameters.page = page;
    return await apiClient.get(`api/v1/reviews/${seq}`, parameters);
  },
  getReview: async (seq: number, id: number) => {
    return await apiClient.get(`api/v1/reviews/${seq}/${id}`);
  },
  createReview: async (seq: number, createReview: CreateReview) => {
    return await apiClient.post(`api/v1/reviews/${seq}`, createReview);
  },
  updateReview: async (seq: number, id: number, updateReview: UpdateReview) => {
    return await apiClient.patch(`api/v1/reviews/${seq}/${id}`, updateReview);
  },
};

function* assign(action: PayloadAction<number>) {
  const seq = action.payload;
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(reviewApi.assign, seq);
    yield put(loaderModule.endLoading());
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(
        alertModalModule.showAlert({
          title: '할당 완료',
          message: '할당 완료',
          refresh: true,
        }),
      );
      yield put(reviewModule.actions.getAssignList);
    } else {
      if ('name' in res && 'message' in res) {
        yield put(
          alertModalModule.showAlert({
            title: res.name,
            message: res.message,
          }),
        );
      } else {
        yield put(
          alertModalModule.showAlert({
            title: '할당 실패',
            message: '할당 실패',
          }),
        );
      }
    }
  } catch (e) {
    yield put(
      alertModalModule.showAlert({
        title: '할당 실패',
        message: '할당 실패',
      }),
    );
  }
}

function* getAssignList(
  action: PayloadAction<{ seq: number; page: number; limit: number }>,
) {
  const { seq, page, limit } = action.payload;
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.getAssignList,
      seq,
      limit,
      page,
      search.parameters || undefined,
    );

    yield put(loaderModule.endLoading());
    const res = apiResponse(response);

    if (response.isSuccess) {
      yield put(reviewModule.actions.setTotalCount(res.data.count));
      yield put(
        reviewModule.actions.setAssignList(
          res.data.sentences.map(toCamel) as Sentence[],
        ),
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
    yield put(loaderModule.endLoading());
    console.log(e);
    yield put(
      alertModal.showAlert({
        title: '데이터 조회 실패',
        message: '데이터 조회 실패',
      }),
    );
  }
}

function* getAssign(action: PayloadAction<{ seq: number; assignId: number }>) {
  const { seq, assignId } = action.payload;
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.getAssign,
      seq,
      assignId,
    );
    yield put(loaderModule.endLoading());
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(
        reviewModule.actions.setAssign(
          toCamel(res.data.sentence) as SentenceReview,
        ),
      );
    } else {
      console.log(res);
      yield put(
        alertModal.showAlert({
          title: '데이터 조회 실패',
          message: '데이터 조회 실패',
        }),
      );
    }
  } catch (e) {
    console.log(e);
    yield put(
      alertModal.showAlert({
        title: '데이터 조회 실패',
        message: '데이터 조회 실패',
      }),
    );
  }
}

function* getReviewList(
  action: PayloadAction<{ seq: number; page: number; limit: number }>,
) {
  const { seq, page, limit } = action.payload;
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.getReviewList,
      seq,
      limit,
      page,
      search.parameters || undefined,
    );

    yield put(loaderModule.endLoading());
    const res = apiResponse(response);

    if (response.isSuccess) {
      yield put(reviewModule.actions.setTotalCount(res.data.count || 0));

      const reviewsData: Review[] = res.data.sentences.map(toCamel);
      const reviews: Review[] = reviewsData.map((item) => {
        const r = item;

        if (r.reviewResult) {
          if (r.reviewer1Id) {
            if (r.reviewResult === 'WAITING') {
              r.reviewRsTxt = lang.sentence.reviewState.review1.wait;
            } else if (r.reviewResult == 'REJECT_1') {
              r.reviewRsTxt = lang.sentence.reviewState.review1.fail;
            } else {
              r.reviewRsTxt = lang.sentence.reviewState.review1.pass;
            }
          }

          if (r.reviewer2Id) {
            if (r.reviewResult === 'WAITING') {
              r.reviewRsTxt = lang.sentence.reviewState.review2.wait;
            } else if (r.reviewResult == 'REJECT_2') {
              r.reviewRsTxt = lang.sentence.reviewState.review2.fail;
            } else {
              r.reviewRsTxt = lang.sentence.reviewState.review2.pass;
            }
          }
        }
        return r;
      });

      yield put(reviewModule.actions.setReviewList(reviews));
    } else {
      console.log(res);
      yield put(
        alertModal.showAlert({
          title: '데이터 조회 실패',
          message: '데이터 조회 실패',
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    console.log(e);
    yield put(
      alertModal.showAlert({
        title: '데이터 조회 실패',
        message: '데이터 조회 실패',
      }),
    );
  }
}

function* getReview(action: PayloadAction<{ seq: number; id: number }>) {
  const { seq, id } = action.payload;
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(reviewApi.getReview, seq, id);
    yield put(loaderModule.endLoading());
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(
        reviewModule.actions.setReview(
          toCamel(res.data.sentence) as SentenceReview,
        ),
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

function* createReview(
  action: PayloadAction<{ seq: number; review: CreateReview }>,
) {
  const { seq, review } = action.payload;

  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.createReview,
      seq,
      review,
    );
    yield put(loaderModule.endLoading());

    const res = apiResponse(response);
    if (response.isSuccess) {
      console.log(res);
      yield put(
        alertModal.showAlert({
          title: '검수 완료',
          message: '검수 완료',
          refresh: true,
        }),
      );
    } else {
      console.log(res);
      if ('message' in res && 'name' in res) {
        yield put(
          alertModal.showAlert({
            title: res.name,
            message: res.message,
          }),
        );
      }
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    console.log(e);
    yield put(
      alertModal.showAlert({
        title: '검수 실패',
        message: '검수 결과 저장 실패',
      }),
    );
  }
}

function* watchReviewSage() {
  yield takeLatest(reviewModule.actions.assign, assign);
  yield takeLatest(reviewModule.actions.getReviewList, getReviewList);
  yield takeLatest(reviewModule.actions.createReview, createReview);
  yield takeLatest(reviewModule.actions.getReview, getReview);
  yield takeLatest(reviewModule.actions.getAssignList, getAssignList);
  yield takeLatest(reviewModule.actions.getAssign, getAssign);
}

export default function* reviewSage() {
  yield fork(watchReviewSage);
}
