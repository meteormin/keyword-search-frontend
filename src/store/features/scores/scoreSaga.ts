import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import newClient, { Clients } from '../../../utils/nia153/api';
import scoreModule from './index';
import searchModule from '../search';
import { SearchState } from '../search/searchAction';
import { ApiResponse } from '../../../utils/ApiClient';
import { apiResponse, auth, date } from '../../../helpers';
import { UserType } from '../../../config/UserType';
import loaderModule from '../common/loader';
import alertModal from '../common/alertModal';
import alertModalModule from '../common/alertModal';
import {
  PostScore,
  Score,
  ScoreAssign,
  ScoreAssignList,
  ScoreList,
  SearchAssigns,
  SearchScores,
} from '../../../utils/nia153/interfaces/score';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { AssignState } from '../../../utils/nia153/interfaces/common';

const scoresApi = newClient(Clients.Scores);
const assignsApi = newClient(Clients.Assigns);

// 할당 관련

function* postAssign() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);

  try {
    const assignType: UserType = UserType.SCORE;

    const response: ApiResponse = yield call(assignsApi.assign, assignType);

    const res = apiResponse(response);

    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const result = res.message;
      yield put(scoreModule.actions.getAssignList());
      auth.setAssigned(UserType.SCORE, true);
      yield put(scoreModule.actions.setTime('할당 중'));
      yield put(
        alertModal.showAlert({
          title: '평가 할당',
          message: result,
          refresh: true,
        }),
      );
    } else {
      yield put(
        alertModal.errorAlert({
          res: res,
          refresh: true,
          fallback: {
            title: '할당실패',
            message: '알 수 없는 에러',
          },
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '할당실패',
          message: '알 수 없는 에러',
        },
      }),
    );
  }
}

function* getAssignList() {
  yield put(loaderModule.startLoading());
  const search: SearchState = yield select(searchModule.getSearchState);
  const searchAssign: SearchAssigns = {
    sentenceId: (search.parameters?.sentenceId as number) || undefined,
    concept: search.parameters?.concept || undefined,
    limit: search.parameters?.limit || undefined,
    page: search.parameters?.page || undefined,
  };

  try {
    const response: ApiResponse = yield call(
      scoresApi.getAssigns,
      searchAssign,
    );
    const res = apiResponse(response);

    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const assignList: ScoreAssignList[] = res.data.map(toCamel);
      const count: number = res.total;
      yield put(
        scoreModule.actions.setAssignList({
          count: count,
          data: assignList,
        }),
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
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '데이터 조회 실패',
          message: '알 수 없는 에러',
        },
      }),
    );
  }
}

function* getAssign(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      scoresApi.getAssign,
      action.payload,
    );
    const res = apiResponse(response);
    const assign: ScoreAssign = toCamel(res) as ScoreAssign;
    const statusRes: ApiResponse = yield call(scoresApi.assignStatus);
    const counts = toCamel(apiResponse(statusRes)) as {
      createdCount: number;
      leftCount: number;
    };

    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      yield put(
        scoreModule.actions.setAssign({
          createdCount: counts.createdCount,
          leftCount: counts.leftCount,
          data: assign,
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '할당 상태 조회 실패',
          message: '알 수 없는 에러',
        },
      }),
    );
  }
}

function* getExpiresAt() {
  const { assignList } = yield select(scoreModule.getScoreState);

  const now = date();
  let jobTime = null;
  let time = 0;
  if (auth.getJobTimeAt(UserType.SCORE) && auth.getAssigned(UserType.SCORE)) {
    jobTime = auth.getJobTimeAt(UserType.SCORE);
    time = date.duration(date(jobTime).diff(now)).asMilliseconds();
  }

  if (assignList.data.length == 0 && auth.getAssigned(UserType.SCORE)) {
    if (jobTime && time !== 0) {
      yield put(scoreModule.actions.setTime(date.utc(time).format('HH:mm:ss')));
      return;
    }
  }

  try {
    if (time !== 0 && auth.getAssigned(UserType.SCORE)) {
      yield put(scoreModule.actions.setTime(date.utc(time).format('HH:mm:ss')));
    } else if (auth.getAssigned(UserType.SCORE) && time === 0) {
      const response: ApiResponse = yield call(
        assignsApi.getAssign,
        UserType.SCORE,
      );
      const res = apiResponse(response);
      if (response.isSuccess) {
        const assignState: AssignState = toCamel(res) as AssignState;
        if (assignState.status) {
          const expiresAt: string = assignState.expiresAt;

          const jobTime = date(expiresAt);
          auth.setJobTimeAt(UserType.SCORE, expiresAt);
          const time = date.duration(jobTime.diff(now)).asMilliseconds();
          yield put(
            scoreModule.actions.setTime(date.utc(time).format('HH:mm:ss')),
          );
          yield put(scoreModule.actions.getAssignList());
        } else {
          auth.setJobTimeAt(UserType.SCORE, '');
          yield put(scoreModule.actions.setTime('할당 중'));
        }
      } else {
        auth.setAssigned(UserType.SCORE, false);
        yield put(scoreModule.actions.getAssignList());
        yield put(scoreModule.actions.setTime(''));
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
    auth.setAssigned(UserType.SCORE, false);
    yield put(scoreModule.actions.setTime('00:00:00'));
    yield put(
      alertModalModule.showAlert({
        title: '진행 가능 시간 초과',
        message: '진행 가능 시간이 초과 되었습니다.',
        refresh: true,
      }),
    );
  }
}

// 평가 관련

function* getList() {
  yield put(loaderModule.startLoading());

  const search: SearchState = yield select(searchModule.getSearchState);
  const searchScore: SearchScores = {
    sentenceId: (search.parameters?.sentenceId as number) || undefined,
    concept: search.parameters?.concept || undefined,
    scoredAtStart: search.parameters?.scoredAtStart || undefined,
    scoredAtEnd: search.parameters?.scoredAtEnd || undefined,
    reviewAtStart: search.parameters?.reviewAtStart || undefined,
    reviewAtEnd: search.parameters?.reviewAtEnd || undefined,
    reviewState: search.parameters?.reviewState || undefined,
    rejectReason: search.parameters?.rejectReason || undefined,
    limit: search.parameters?.limit || undefined,
    page: search.parameters?.page || undefined,
  };
  try {
    const response: ApiResponse = yield call(scoresApi.getScores, searchScore);
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const scoresList: ScoreList[] = res.data.map(toCamel);
      yield put(
        scoreModule.actions.setList({
          count: res.total,
          data: scoresList,
        }),
      );
    } else {
      yield put(
        alertModal.errorAlert({
          res: res,
          refresh: true,
          fallback: {
            title: '평가 데이터 조회 실패',
            message: '알 수 없는 에러',
          },
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '할당 상태 조회 실패',
          message: '알 수 없는 에러',
        },
      }),
    );
  }
}

function* getScore(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      scoresApi.getScore,
      action.payload,
    );
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const score: Score = toCamel(res) as Score;
      yield put(
        scoreModule.actions.setScore({
          createdCount: 0,
          leftCount: 0,
          data: score,
        }),
      );
    } else {
      yield put(
        alertModal.errorAlert({
          res: res,
          refresh: true,
          fallback: {
            title: '평가 조회 실패',
            message: '알 수 없는 에러',
          },
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '평가 조회 실패',
          message: '알 수 없는 에러',
        },
      }),
    );
  }
}

function* createScore(action: PayloadAction<PostScore>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      scoresApi.createScore,
      action.payload,
    );
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      const score: Score = toCamel(res) as Score;
      yield put(
        scoreModule.actions.setAssign({
          createdCount: 0,
          leftCount: 0,
          data: null,
        }),
      );
      yield put(scoreModule.actions.getAssignList());
      yield put(
        alertModal.showAlert({
          title: '평가 완료',
          message: '평가 완료',
        }),
      );
    } else {
      yield put(
        alertModal.errorAlert({
          res: res,
          refresh: true,
          fallback: {
            title: '평가 실패',
            message: '알 수 없는 이유로 평가에 실패했습니다.',
          },
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModal.errorAlert({
        res: e,
        refresh: true,
        fallback: {
          title: '평가 실패',
          message: '알 수 없는 이유로 평가에 실패했습니다.',
        },
      }),
    );
  }
}

function* watchScoreSaga() {
  yield takeLatest(scoreModule.actions.postAssign, postAssign);
  yield takeLatest(scoreModule.actions.getAssignList, getAssignList);
  yield takeLatest(scoreModule.actions.selectAssign, getAssign);
  yield takeLatest(scoreModule.actions.getList, getList);
  yield takeLatest(scoreModule.actions.selectScore, getScore);
  yield takeLatest(scoreModule.actions.getExpiresAt, getExpiresAt);
  yield takeLatest(scoreModule.actions.createScore, createScore);
}

export default function* scoreSaga() {
  yield fork(watchScoreSaga);
}
