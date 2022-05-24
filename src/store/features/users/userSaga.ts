import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import usersModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  Group,
  UpdateGroupPerm,
  Permission,
  User,
  CreateGroup,
  CreateUser,
} from './userAction';

const apiClient = api({
  token: { token: auth.getToken(), tokenType: 'bearer' },
});

const usersApi = {
  group: {
    getGroup: async (id?: number) => {
      let url = `api/v1/groups`;
      if (id) {
        url += `/${id}`;
      }

      return await apiClient.get(url);
    },
    patchGroupPerm: async (permissions: UpdateGroupPerm) => {
      return await apiClient.patch(`api/v1/groups/${permissions.id}`, {
        permissions: permissions.permissions,
      });
    },
    getPermissions: async () => {
      return await apiClient.get('api/v1/groups/permissions');
    },
    createGroup: async (group: Group | CreateGroup) => {
      return await apiClient.post('api/v1/groups', group);
    },
    updateGroup: async (group: Group) => {
      return await apiClient.patch(`api/v1/groups`, group);
    },
  },
  user: {
    getUser: async (id?: number) => {
      let url = `api/v1/users`;
      if (id) {
        url += `/${id}`;
      }

      return await apiClient.get(url);
    },
    resetPassword: async (id: number) => {
      const url = `api/v1/users/${id}/password`;
      return await apiClient.patch(url);
    },
    createUser: async (user: CreateUser) => {
      const url = `api/v1/auth/signUp`;
      return await apiClient.post(url, {
        id: user.loginId,
        name: user.name,
        userType: user.userType,
        group: user.groupId,
      });
    },
    updateUser: async (user: User) => {
      const url = `api/v1/users`;
      return await apiClient.patch(url, user);
    },
    updatePassword: async (id: number, password: string) => {
      const url = `api/v1/users/me/password`;
      return await apiClient.patch(url, {
        password: password,
      });
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

      yield put(usersModule.actions.setGroups(groups));
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
      yield put(usersModule.actions.setGroup(group));
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
      yield put(usersModule.actions.setEditGroup(group));
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
      yield put(usersModule.actions.setEditUser(user));
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
      yield put(usersModule.actions.setPermList(permList));
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
      yield put(usersModule.actions.getGroups());
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

function* resetPassword(action: PayloadAction<number>) {
  const userId = action.payload;
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(
      usersApi.user.resetPassword,
      userId,
    );
    const res = apiResponse(response);
    yield put(loaderModule.endLoading());

    if (response.isSuccess) {
      yield put(
        alertModalModule.showAlert({
          title: '암호초기화 성공',
          message: '암호 초기화 성공',
        }),
      );
    } else {
      yield put(
        alertModalModule.showAlert({
          title: '암호초기화 실패',
          message: '암호 초기화 실패',
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '암호초기화 실패',
        message: '암호 초기화 실패',
      }),
    );
  }
}

function* saveGroup(action: PayloadAction<Group | CreateGroup>) {
  yield put(loaderModule.startLoading());
  try {
    let response: ApiResponse;
    let message: string;

    if (action.payload.hasOwnProperty('id')) {
      message = '그룹 수정';
      response = yield call(
        usersApi.group.updateGroup,
        action.payload as Group,
      );
    } else {
      message = '그룹 등록';
      response = yield call(usersApi.group.createGroup, action.payload);
    }

    const res = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      yield put(usersModule.actions.getGroups());
      // if ('permissions' in action.payload) {
      //   const updateGroup: UpdateGroupPerm = {
      //     id: res.groups.id,
      //     permissions: action.payload.permissions,
      //   };
      //   response = yield call(usersApi.group.patchGroupPerm, updateGroup);
      //   if (response.isSuccess) {
      //     yield put(usersModule.actions.getGroups());
      //   } else {
      //     yield put(
      //       alertModalModule.showAlert({
      //         title: message + ' 실패',
      //         message: message + ' 실패',
      //       }),
      //     );
      //   }
      //}

      yield put(
        alertModalModule.showAlert({
          title: message + ' 성공',
          message: message + ' 성공',
        }),
      );
    } else {
      yield put(
        alertModalModule.showAlert({
          title: message + ' 실패',
          message: message + ' 실패',
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 전송 실패',
        message: e,
      }),
    );
  }
}

function* saveUser(action: PayloadAction<User | CreateUser>) {
  yield put(loaderModule.startLoading());
  try {
    let response: ApiResponse;
    let message: string;

    if (action.payload.hasOwnProperty('id')) {
      message = '사용자 수정';
      response = yield call(usersApi.user.updateUser, action.payload as User);
    } else {
      message = '사용자 등록';
      response = yield call(
        usersApi.user.createUser,
        action.payload as CreateUser,
      );
    }

    const res: ApiResponse = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      yield put(usersModule.actions.getGroup(action.payload.groupId));
      yield put(
        alertModalModule.showAlert({
          title: message + ' 성공',
          message: message + ' 성공',
        }),
      );
    } else {
      yield put(
        alertModalModule.showAlert({
          title: message + ' 실패',
          message: message + ' 실패',
        }),
      );
    }
  } catch (error) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '데이터 전송 실패',
        message: error,
      }),
    );
  }
}

function* watchUsersSaga() {
  yield takeLatest(usersModule.actions.getGroups, getGroupsSaga);
  yield takeLatest(usersModule.actions.getGroup, getGroupSaga);
  yield takeLatest(usersModule.actions.getEditGroup, getEditGroupSaga);
  yield takeLatest(usersModule.actions.setGroupPermission, saveGroupPermSage);
  yield takeLatest(usersModule.actions.getPermList, getPermListSaga);

  yield takeLatest(usersModule.actions.getEditUser, getEditUserSaga);
  yield takeLatest(usersModule.actions.resetPassword, resetPassword);
  yield takeLatest(usersModule.actions.saveUser, saveUser);
  yield takeLatest(usersModule.actions.saveGroup, saveGroup);
}

export default function* usersSage() {
  yield fork(watchUsersSaga);
}
