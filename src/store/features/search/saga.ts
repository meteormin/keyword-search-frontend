import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderStore from 'store/features/common/loader';
import alertModalStore from 'store/features/common/alertModal';
import searchStore from 'store/features/search';
import makeClient, { isErrorResponse, serializeErrorResponse } from 'api';
import SearchClient, {
  CreateSearch,
  UpdateSearch,
  PatchSearch,
} from 'api/clients/Search';
import { Search } from 'api/interfaces/Search';
import { ErrorResInterface } from 'api/base/ApiClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { auth } from 'helpers';

const client = makeClient<SearchClient>(SearchClient, {
  token: auth.getToken()?.accessToken.token || '',
  tokenType: auth.getToken()?.accessToken.tokenType || '',
});

function* create(action: PayloadAction<CreateSearch>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Search | ErrorResInterface | null = yield call(
      client.create,
      action.payload,
    );

    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: serializeErrorResponse(res),
          fallback: {
            title: 'Search',
            message: 'Search 수정 실패',
          },
        }),
      );
      return;
    }
    yield put(
      alertModalStore.showAlert({
        title: 'Search',
        message: 'Search 생성 성공',
        refresh: true,
      }),
    );
  } catch (e) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: serializeErrorResponse(e),
        fallback: {
          title: 'Search',
          message: 'Search 생성 실패',
        },
      }),
    );
  }
}

function* update(action: PayloadAction<{ id: number; update: UpdateSearch }>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Search | ErrorResInterface | null = yield call(
      client.update,
      action.payload.id,
      action.payload.update,
    );

    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: serializeErrorResponse(res),
          fallback: {
            title: 'Search',
            message: 'Search 수정 실패',
          },
        }),
      );
      return;
    }

    yield put(
      alertModalStore.showAlert({
        title: 'Search',
        message: 'Search 수정 성공',
        refresh: true,
      }),
    );
  } catch (e) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: serializeErrorResponse(e),
        fallback: {
          title: 'Search',
          message: 'Search 수정 실패',
        },
      }),
    );
  }
}

function* patch(action: PayloadAction<{ id: number; patch: PatchSearch }>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Search | ErrorResInterface | null = yield call(
      client.patch,
      action.payload.id,
      action.payload.patch,
    );

    yield put(loaderStore.endLoading());
    if (isErrorResponse(res)) {
      yield put(
        alertModalStore.errorAlert({
          res: serializeErrorResponse(res),
          fallback: {
            title: 'Search',
            message: 'Search 수정 실패',
          },
        }),
      );
      return;
    }

    yield put(
      alertModalStore.showAlert({
        title: 'Search',
        message: 'Search 수정 성공',
        refresh: true,
      }),
    );
  } catch (e) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: serializeErrorResponse(e),
        fallback: {
          title: 'Search',
          message: 'Search 수정 실패',
        },
      }),
    );
  }
}

function* destroy(action: PayloadAction<number>) {
  yield put(loaderStore.startLoading());
  try {
    const res: Search | ErrorResInterface | null = yield call(
      client.delete,
      action.payload,
    );
    console.debug(res);
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.showAlert({
        title: 'Search',
        message: 'Search 삭제 성공',
        refresh: true,
      }),
    );
  } catch (e) {
    yield put(loaderStore.endLoading());
    yield put(
      alertModalStore.errorAlert({
        res: serializeErrorResponse(e),
        fallback: {
          title: 'Search',
          message: 'Search 삭제 실패',
        },
      }),
    );
  }
}

function* watchSaga() {
  yield takeLatest(searchStore.actions.create, create);
  yield takeLatest(searchStore.actions.update, update);
  yield takeLatest(searchStore.actions.patch, patch);
  yield takeLatest(searchStore.actions.delete, destroy);
}

export default function* Saga() {
  yield fork(watchSaga);
}
