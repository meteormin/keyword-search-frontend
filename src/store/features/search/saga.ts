import { fork, takeLatest } from 'redux-saga/effects';
import searchStore, {
  useCallSearchApi,
  usePutSearchAction,
} from 'store/features/search';
import { CreateSearch, UpdateSearch, PatchSearch } from 'api/clients/Search';
import { Search } from 'api/interfaces/Search';
import { ApiResponse, ErrorResInterface } from 'api/base/ApiClient';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  putEndLoading,
  putErrorAlert,
  putShowAlert,
  putStartLoading,
} from 'store/features';

const apiCall = useCallSearchApi();

function* create(action: PayloadAction<CreateSearch>) {
  yield putStartLoading();
  try {
    const res: ApiResponse<Search | ErrorResInterface> = yield apiCall.create(
      action.payload,
    );

    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 생성 실패');
      return;
    }
    yield putShowAlert('Search', 'Search 생성 성공', true);
  } catch (e) {
    yield putEndLoading();
    yield putErrorAlert(e, 'Search', 'Search 생성 실패');
  }
}

function* update(action: PayloadAction<{ id: number; update: UpdateSearch }>) {
  yield putStartLoading();
  try {
    const res: ApiResponse<Search | ErrorResInterface> = yield apiCall.update(
      action.payload.id,
      action.payload.update,
    );

    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 수정 실패');
      return;
    }
    yield putShowAlert('Search', 'Search 수정 성공', true);
  } catch (e) {
    yield putEndLoading();
    yield putErrorAlert(e, 'Search', 'Search 수정 실패');
  }
}

function* patch(action: PayloadAction<{ id: number; patch: PatchSearch }>) {
  yield putStartLoading();
  try {
    const res: ApiResponse<Search | ErrorResInterface> = yield apiCall.patch(
      action.payload.id,
      action.payload.patch,
    );

    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 수정 실패');
      return;
    }
    yield putShowAlert('Search', 'Search 수정 성공', true);
  } catch (e) {
    yield putEndLoading();
    yield putErrorAlert(e, 'Search', 'Search 수정 실패');
  }
}

function* destroy(action: PayloadAction<number>) {
  yield putStartLoading();
  try {
    const res: ApiResponse<Search | ErrorResInterface> = yield apiCall.delete(
      action.payload,
    );
    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 삭제 실패');
      return;
    }
    yield putShowAlert('Search', 'Search 삭제 성공');
  } catch (e) {
    yield putEndLoading();
    yield putErrorAlert(e, 'Search', 'Search 삭제 실패');
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
