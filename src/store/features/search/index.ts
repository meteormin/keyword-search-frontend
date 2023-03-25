import { actions, getState } from 'store/features/search/reducer';
import { useDispatch, useSelector } from 'react-redux';
import makeClient from 'api';
import SearchClient, {
  AllParam,
  CreateSearch,
  PatchSearch,
  UpdateSearch,
} from 'api/clients/Search';
import { call, put } from 'redux-saga/effects';
import { ActionCall } from 'store/features';
import { auth } from 'helpers';
import { PreviewImage } from 'store/features/search/action';

export const useSearchState = () => {
  return useSelector(getState);
};

export const useCallSearchApi = () => {
  const client = makeClient<SearchClient>(SearchClient, {
    token: auth.getToken()?.accessToken.token || '',
    tokenType: auth.getToken()?.accessToken.tokenType || '',
  });

  return {
    all: (params: AllParam) => call(client.all, params),
    create: (params: CreateSearch) => call(client.create, params),
    update: (id: number, params: UpdateSearch) =>
      call(client.update, id, params),
    patch: (id: number, params: PatchSearch) => call(client.patch, id, params),
    delete: (id: number) => call(client.delete, id),
    uploadImage: (id: number, file: File) => call(client.uploadImage, id, file),
    getImage: (id: number) => call(client.getPreviewImage, id),
  };
};

const actionCall = (call: ActionCall) => {
  return {
    create: (create: CreateSearch) => call(actions.create(create)),
    update: (id: number, update: UpdateSearch) =>
      call(actions.update({ id, update })),
    patch: (id: number, patch: PatchSearch) =>
      call(actions.patch({ id, patch })),
    delete: (id: number) => call(actions.delete(id)),
    uploadImage: (id: number, file: PreviewImage) =>
      call(actions.uploadImage({ id, file })),
    getImage: (id: number) => call(actions.getImage(id)),
    setPreviewImage: (file: PreviewImage | null) =>
      call(actions.setPreviewImage(file)),
  };
};

export const usePutSearchAction = () => {
  return actionCall(put);
};

export const useSearchDispatch = () => {
  return actionCall(useDispatch());
};

export default {
  actions,
  getState,
};
