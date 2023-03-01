import { actions, getState } from 'store/features/hosts/reducer';
import { useDispatch, useSelector } from 'react-redux';
import HostClient, {
  CreateHost,
  GetList,
  GetListParam,
  GetSearch,
  GetSearchDescriptions,
  GetSubjects,
  PatchHost,
  UpdateHost,
} from 'api/clients/Hosts';
import { Host } from 'api/interfaces/Hosts';
import { Page } from 'api/interfaces/Common';
import { call, put } from 'redux-saga/effects';
import { HostState } from './action';
import { ActionCall } from '../index';
import makeClient from '../../../api';
import { auth } from '../../../helpers';

export const useHostState = (): HostState => {
  return useSelector(getState);
};

export const useCallHostApi = () => {
  const client = makeClient<HostClient>(HostClient, {
    token: auth.getToken()?.accessToken.token || '',
    tokenType: auth.getToken()?.accessToken.tokenType || '',
  });
  return {
    getList: (getList: GetListParam) => call(client.getList, getList),
    getSubjects: (page: Page) => call(client.getSubjects, page),
    getSearch: (hostId: number, page: Page) =>
      call(client.getSearch, hostId, page),
    getSearchDescriptions: (hostId: number, page: Page) =>
      call(client.getSearchDescriptions, hostId, page),
    create: (create: CreateHost) => call(client.create, create),
    update: (id: number, update: UpdateHost) => call(client.update, id, update),
    patch: (id: number, host: PatchHost) => call(client.patch, id, host),
    delete: (id: number) => call(client.delete, id),
    find: (id: number) => call(client.find, id),
  };
};

const actionCall = (call: ActionCall) => {
  return {
    getList: (page: Page) => call(actions.getList({ page })),
    getSubjects: (page: Page) => call(actions.getSubjects({ page })),
    getSearch: (hostId: number, page: Page) =>
      call(actions.getSearch({ hostId, page })),
    getSearchDescriptions: (hostId: number, page: Page) =>
      call(actions.getSearchDescriptions({ hostId, page })),
    create: (create: CreateHost) => call(actions.create(create)),
    update: (id: number, update: UpdateHost) =>
      call(actions.update({ id: id, host: update })),
    patch: (id: number, host: PatchHost) => call(actions.patch({ id, host })),
    delete: (id: number) => call(actions.delete(id)),
    find: (id: number) => call(actions.find(id)),
    setSelectId: (id: number) => call(actions.setSelectId(id)),
    setList: (list: GetList) => call(actions.setList(list)),
    setCreate: (create: CreateHost) => call(actions.setCreate(create)),
    setUpdate: (update: UpdateHost) => call(actions.setUpdate(update)),
    setPatch: (patch: PatchHost) => call(actions.setPatch(patch)),
    setSelect: (host: Host | null) => call(actions.setSelect(host)),
    setSearch: (search: GetSearch) => call(actions.setSearch(search)),
    setSubjects: (subject: GetSubjects) => call(actions.setSubjects(subject)),
    setSearchDescriptions: (description: GetSearchDescriptions) =>
      call(actions.setSearchDescriptions(description)),
    setPage: (page: Page) => call(actions.setPage(page)),
  };
};

export const useHostDispatch = () => {
  return actionCall(useDispatch());
};

export const usePutHostAction = () => {
  return actionCall(put);
};

export default {
  actions,
  getState,
};
