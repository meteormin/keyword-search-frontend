import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderStore from 'store/features/common/loader';
import alertModalStore from 'store/features/common/alertModal';
import hostStore from 'store/features/hosts';
import makeClient, { isErrorResponse } from 'api';
import HostClient, {
  CreateHost,
  GetList,
  GetListParam,
  GetSearch,
  GetSearchDescriptions,
  GetSubjects,
} from 'api/clients/Hosts';
import { ErrorResInterface, ErrorResponse } from 'api/base/ApiClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { Host } from 'api/interfaces/Hosts';
import { Page } from 'api/interfaces/Common';
import { auth } from 'helpers';

const client = makeClient<HostClient>(HostClient, {
  token: auth.getToken()?.accessToken.token || '',
  tokenType: auth.getToken()?.accessToken.tokenType || '',
});

function* getList(action: PayloadAction<{ page: Page }>) {
  yield put(loaderStore.startLoading());
  try {
    const res: GetList | ErrorResInterface | null = yield call(
      client.getList,
      action.payload.page as GetListParam,
    );
    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
          fallback: {
            title: 'Hosts',
            message: 'Host 목록 조회 실패',
          },
        }),
      );
      return;
    }
    const list = res as GetList;

    yield put(hostStore.actions.setList(list));
  } catch (err) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: 'Host 목록 조회 실패',
        },
      }),
    );
  }
}

function* getSearch(action: PayloadAction<{ hostId: number; page: Page }>) {
  yield put(loaderStore.startLoading());
  try {
    const res: GetSearch | ErrorResInterface | null = yield call(
      client.getSearch,
      action.payload.hostId,
      action.payload.page,
    );
    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
          fallback: {
            title: 'Hosts',
            message: `Host ${action.payload.hostId} Search 목록 조회 실패`,
          },
        }),
      );
      return;
    }

    const list = res as GetSearch;

    yield put(hostStore.actions.setSearch(list));
  } catch (err) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: `Host ${action.payload.hostId} Search 목록 조회 실패`,
        },
      }),
    );
  }
}

function* getSubjects(action: PayloadAction<{ page: Page }>) {
  yield put(loaderStore.startLoading());
  try {
    const res: GetSubjects | ErrorResInterface | null = yield call(
      client.getSubjects,
      action.payload.page,
    );

    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
          fallback: {
            title: 'Hosts',
            message: `Host subjects 조회 실패`,
          },
        }),
      );
      return;
    }

    const list = res as GetSubjects;

    yield put(hostStore.actions.setSubjects(list));
  } catch (err) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: `Host subjects 조회 실패`,
        },
      }),
    );
  }
}

function* getSearchDescriptions(
  action: PayloadAction<{ hostId: number; page: Page }>,
) {
  yield put(loaderStore.startLoading());
  try {
    const res: GetSearchDescriptions | ErrorResInterface | null = yield call(
      client.getSearchDescriptions,
      action.payload.hostId,
      action.payload.page,
    );
    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
          fallback: {
            title: 'Hosts',
            message: `Host ${action.payload.hostId} Search Description 목록 조회 실패`,
          },
        }),
      );
      return;
    }

    const list = res as GetSearchDescriptions;

    yield put(hostStore.actions.setSearchDescriptions(list));
  } catch (err) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: `Host ${action.payload.hostId} Search Description 목록 조회 실패`,
        },
      }),
    );
  }
}

function* find(action: PayloadAction<number>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Host | ErrorResInterface | null = yield call(
      client.find,
      action.payload,
    );
    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
        }),
      );
      return;
    }
    const host = res as Host;
    yield put(hostStore.actions.setSelect(host));
  } catch (err) {
    if (isErrorResponse(err)) {
      if (err instanceof ErrorResponse) {
        err = err.serialize();
      }
    }
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: 'Host 조회 실패',
        },
      }),
    );
  }
}

function* create(action: PayloadAction<CreateHost>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Host | ErrorResInterface | null = yield call(
      client.create,
      action.payload,
    );
    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: res,
          fallback: {
            title: 'Hosts',
            message: 'Host 생성 실패',
          },
        }),
      );
      return;
    }
    const host: Host = res as Host;
    yield put(hostStore.actions.setSelect(host));
  } catch (err) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: err,
        fallback: {
          title: 'Hosts',
          message: 'Host 생성 실패',
        },
      }),
    );
  }
}

function* watchSaga() {
  yield takeLatest(hostStore.actions.getList, getList);
  yield takeLatest(hostStore.actions.getSearch, getSearch);
  yield takeLatest(hostStore.actions.getSubjects, getSubjects);
  yield takeLatest(
    hostStore.actions.getSearchDescriptions,
    getSearchDescriptions,
  );
  yield takeLatest(hostStore.actions.find, find);
  yield takeLatest(hostStore.actions.create, create);
}

export default function* Saga() {
  yield fork(watchSaga);
}
