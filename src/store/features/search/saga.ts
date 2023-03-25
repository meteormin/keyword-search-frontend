import { call, fork, takeLatest, select } from 'redux-saga/effects';
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
import axios, { AxiosResponse } from 'axios';
import { PreviewImage, SearchState } from './action';
import { parseAttachFileName } from '../../../utils/str';

const apiCall = useCallSearchApi();
const putAction = usePutSearchAction();

function* create(action: PayloadAction<CreateSearch>) {
  yield putStartLoading();
  try {
    let res: ApiResponse<Search | ErrorResInterface> = yield apiCall.create(
      action.payload,
    );

    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 생성 실패');
      return;
    }

    const { previewImage }: SearchState = yield select(searchStore.getState);
    if (previewImage != null) {
      const search = res.data as Search;
      const blobRes: AxiosResponse = yield call(axios.get, previewImage.url, {
        responseType: 'blob',
      });
      const fileBlob: Blob = blobRes.data;
      res = yield apiCall.uploadImage(
        search.id,
        new File([fileBlob], previewImage.filename, { type: 'image/png' }),
      );
      if (!res.isSuccess) {
        console.log(res);
        yield putErrorAlert(res.data, 'Search', 'Search 이미지 업로드 실패');
      }
      yield putAction.setPreviewImage(null);
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
    let res: ApiResponse<Search | ErrorResInterface> = yield apiCall.patch(
      action.payload.id,
      action.payload.patch,
    );

    yield putEndLoading();
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 수정 실패');
      return;
    }

    const { previewImage }: SearchState = yield select(searchStore.getState);
    if (previewImage != null) {
      const search = res.data as Search;
      const blobRes: AxiosResponse = yield call(axios.get, previewImage.url, {
        responseType: 'blob',
      });
      const fileBlob: Blob = blobRes.data;
      res = yield apiCall.uploadImage(
        search.id,
        new File([fileBlob], previewImage.filename),
      );
      if (!res.isSuccess) {
        console.log(res);
        yield putErrorAlert(res.data, 'Search', 'Search 이미지 업로드 실패');
      }
      yield putAction.setPreviewImage(null);
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

function* uploadImage(
  action: PayloadAction<{ id: number; file: PreviewImage }>,
) {
  yield putStartLoading();
  try {
    const fileBlob: Blob = yield call(axios.get, action.payload.file.url);

    const res: ApiResponse<Search | ErrorResInterface> =
      yield apiCall.uploadImage(
        action.payload.id,
        new File([fileBlob], action.payload.file.filename),
      );
    if (!res.isSuccess) {
      yield putErrorAlert(res.data, 'Search', 'Search 이미지 업로드 실패');
      return;
    }
    yield putShowAlert('Search', 'Search 이미지 업로드 성공');
  } catch (e) {
    yield putEndLoading();
    yield putErrorAlert(e, 'Search', 'Search 이미지 업로드 실패');
  }
}

function* getImage(action: PayloadAction<number>) {
  yield putStartLoading();
  try {
    const res: ApiResponse = yield apiCall.getImage(action.payload);
    yield putEndLoading();
    if (!res.isSuccess) {
      console.log(res.data);
      return;
    }
    const url = URL.createObjectURL(res.data);
    const filename = parseAttachFileName(
      res?.headers['content-disposition'] as string,
    );
    yield putAction.setPreviewImage({ filename, url });
  } catch (e) {
    yield putEndLoading();
    console.log(e);
  }
}

function* watchSaga() {
  yield takeLatest(searchStore.actions.create, create);
  yield takeLatest(searchStore.actions.update, update);
  yield takeLatest(searchStore.actions.patch, patch);
  yield takeLatest(searchStore.actions.delete, destroy);
  yield takeLatest(searchStore.actions.uploadImage, uploadImage);
  yield takeLatest(searchStore.actions.getImage, getImage);
}

export default function* Saga() {
  yield fork(watchSaga);
}
