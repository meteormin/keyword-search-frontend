import {
  api,
  apiResponse,
  auth,
  date,
  switchReviewStatus,
} from '../../../helpers';
import {
  CreateReview,
  Review,
  SentenceReview,
  UpdateReview,
} from './reviewAction';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import { ApiResponse } from '../../../utils/ApiClient';
import reviewModule from './index';
import alertModal from '../common/alertModal';
import alertModalModule from '../common/alertModal';
import { toCamel } from 'snake-camel';
import { SearchParameter, SearchState } from '../search/searchAction';
import searchModule from '../search';
import { Sentence } from '../sentence/sentenceAction';
import { UserType } from '../../../config/UserType';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const reviewApi = {
  assign: async (seq: number, search?: SearchParameter) => {
    return await apiClient.post(`api/v1/reviews/${seq}/assign`, search);
  },
  getAssignList: async (seq: number, search?: SearchParameter) => {
    return await apiClient.get(`api/v1/reviews/${seq}/assigned`, search);
  },
  getAssign: async (seq: number, assignId: number) => {
    return await apiClient.get(`api/v1/sentences/${assignId}`);
  },
  getReviewList: async (seq: number, search?: SearchParameter) => {
    return await apiClient.get(`api/v1/reviews/${seq}`, search);
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
  getExpiredAt: async (seq: number) => {
    return await apiClient.get(`api/v1/reviews/${seq}/assign/expiredAt`);
  },
};

function* assign(action: PayloadAction<number>) {
  const seq = action.payload;
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.assign,
      seq,
      search.parameters || undefined,
    );
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
      yield put(alertModalModule.errorAlert({ res: res }));
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

function* getAssignList(action: PayloadAction<{ seq: number }>) {
  const { seq } = action.payload;
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.getAssignList,
      seq,
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
        alertModal.errorAlert({
          res: res,
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
        alertModal.errorAlert({
          res: res,
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

function* getReviewList(action: PayloadAction<{ seq: number }>) {
  const { seq } = action.payload;
  const search: SearchState = yield select(searchModule.getSearchState);
  try {
    yield put(loaderModule.startLoading());
    const response: ApiResponse = yield call(
      reviewApi.getReviewList,
      seq,

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
          const { reviewStatus } = switchReviewStatus(r.reviewResult);
          r.reviewRsTxt = reviewStatus;
        }
        return r;
      });

      yield put(reviewModule.actions.setReviewList(reviews));
    } else {
      console.log(res);
      yield put(
        alertModal.errorAlert({
          res: res,
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
        alertModal.errorAlert({
          res: res,
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
      yield put(reviewModule.actions.getReviewList({ seq: seq }));
      yield put(reviewModule.actions.setReview(null));
      yield put(
        alertModal.showAlert({
          title: '검수 완료',
          message: '검수 완료',
          refresh: false,
        }),
      );
    } else {
      console.log(res);

      yield put(
        alertModal.errorAlert({
          res: res,
        }),
      );
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

function* getTime(action: PayloadAction<{ seq: number }>) {
  let userType = UserType.REVIEWER1;
  if (action.payload.seq == 2) {
    userType = UserType.REVIEWER2;
  }

  const { sentences } = yield select(reviewModule.getReviewState);
  if (sentences.length == 0) {
    return;
  }
  try {
    const now = date();

    if (auth.getJobTimeAt(userType)) {
      const time = date
        .duration(auth.getJobTimeAt(userType)?.diff(now))
        .asMilliseconds();
      yield put(
        reviewModule.actions.setTime(date.utc(time).format('HH:mm:ss')),
      );
    } else {
      const response: ApiResponse = yield call(
        reviewApi.getExpiredAt,
        action.payload.seq,
      );
      const res = apiResponse(response);
      if (response.isSuccess) {
        const expiredAt = date(res.data.expired_at);
        auth.setJobTimeAt(userType, res.data.expired_at);
        const time = date.duration(expiredAt.diff(now)).asMilliseconds();
        yield put(
          reviewModule.actions.setTime(date.utc(time).format('HH:mm:ss')),
        );
      } else {
        console.log(res);
        yield put(
          reviewModule.actions.getReviewList({
            seq: action.payload.seq,
          }),
        );
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

function* watchReviewSage() {
  yield takeLatest(reviewModule.actions.assign, assign);
  yield takeLatest(reviewModule.actions.getReviewList, getReviewList);
  yield takeLatest(reviewModule.actions.createReview, createReview);
  yield takeLatest(reviewModule.actions.getReview, getReview);
  yield takeLatest(reviewModule.actions.getAssignList, getAssignList);
  yield takeLatest(reviewModule.actions.getAssign, getAssign);
  yield takeLatest(reviewModule.actions.getExpiredAt, getTime);
}

export default function* reviewSage() {
  yield fork(watchReviewSage);
}
