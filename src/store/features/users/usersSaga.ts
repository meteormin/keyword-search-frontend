import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import usersModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import { Group, UpdateGroupPerm, Permission, User } from './usersAction';

const usersApi = {
  group: {
    getGroup: async (id?: number) => {
      const client = api();
      let url = `api/v1/groups`;
      if (id) {
        url += `/${id}`;
      }

      return await client
        .withToken(auth.getToken() as string, 'bearer')
        .get(url);
    },
    patchGroupPerm: async (permissions: UpdateGroupPerm) => {
      const client = api();
      return await client
        .withToken(auth.getToken() as string, 'bearer')
        .patch(`api/v1/groups/${permissions.id}`, {
          permissions: permissions.permissions,
        });
    },
    getPermissions: async () => {
      const client = api();
      return await client
        .withToken(auth.getToken() as string, 'bearer')
        .get('api/v1/groups/permissions');
    },
  },
  user: {
    getUser: async (id?: number) => {
      const client = api();
      let url = `api/v1/users`;
      if (id) {
        url += `/${id}`;
      }

      return await client
        .withToken(auth.getToken() as string, 'bearer')
        .get(url);
    },
  },
};

function* getGroupsSaga() {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(usersApi.group.getGroup);

    const res = apiResponse(response);
    if (response.isSuccess) {
      const groups: Group[] = res.data.groups.map(toCamel);

      yield put(usersModule.setGroups(groups));
      yield put(loaderModule.endLoading());
    } else {
      console.log(res);
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: error,
      }),
    );
  }
}

function* getGroupSaga(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      usersApi.group.getGroup,
      action.payload,
    );

    const res = apiResponse(response);

    if (response.isSuccess) {
      const group: Group = toCamel(res.data.group) as Group;
      yield put(usersModule.setGroup(group));
      yield put(loaderModule.endLoading());
    } else {
      console.log(res);
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: '데이터를 불러오는데 실패했습니다.',
      }),
    );
  }
}

function* getEditGroupSaga(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      usersApi.group.getGroup,
      action.payload,
    );

    const res = apiResponse(response);

    if (response.isSuccess) {
      const group: Group = toCamel(res.data.group) as Group;
      yield put(usersModule.setEditGroup(group));
      yield put(loaderModule.endLoading());
    } else {
      console.log(res);
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: '데이터를 불러오는데 실패했습니다.',
      }),
    );
  }
}

function* getEditUserSaga(action: PayloadAction<number>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      usersApi.user.getUser,
      action.payload,
    );
    const res = apiResponse(response);
    if (response.isSuccess) {
      const user: User = toCamel(res.data.user) as User;
      yield put(usersModule.setEditUser(user));
      yield put(loaderModule.endLoading());
    } else {
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (e) {
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: '데이터를 불러오는데 실패했습니다.',
      }),
    );
  }
}

function* getPermListSaga() {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(usersApi.group.getPermissions);
    const res = apiResponse(response);
    if (response.isSuccess) {
      const permList: Permission[] = res.data.permissions.map(toCamel);
      yield put(loaderModule.endLoading());
      yield put(usersModule.setPermList(permList));
    } else {
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
    yield put(
      alertModalModule.showAlert({
        title: '데이터 조회 실패',
        message: '데이터를 불러오는데 실패했습니다.',
      }),
    );
  }
}

function* saveGroupPermSage(action: PayloadAction<UpdateGroupPerm>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      usersApi.group.patchGroupPerm,
      action.payload,
    );
    const res = apiResponse(response);
    if (response.isSuccess) {
      yield put(loaderModule.endLoading());
      yield put(usersModule.getGroups());
    } else {
      console.log(res);
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '저장 실패',
          message: '권한을 저장하는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '저장 실패',
        message: '권한을 저장하는데 실패했습니다.',
      }),
    );
  }
}

function* watchUsersSaga() {
  yield takeLatest(usersModule.getGroups, getGroupsSaga);
  yield takeLatest(usersModule.getGroup, getGroupSaga);
  yield takeLatest(usersModule.getEditGroup, getEditGroupSaga);
  yield takeLatest(usersModule.setGroupPermission, saveGroupPermSage);
  yield takeLatest(usersModule.getPermList, getPermListSaga);
  yield takeLatest(usersModule.getEditUser, getEditUserSaga);
}

export default function* UsersSage() {
  yield fork(watchUsersSaga);
}
