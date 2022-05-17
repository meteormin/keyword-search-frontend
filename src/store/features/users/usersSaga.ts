import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import usersModule from './';
import { api, apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel, toSnake } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import usersAction, {
  Group,
  UpdateGroupPerm,
  Permission,
  User,
} from './usersAction';

const usersApi = {
  group: {
    getGroup: async (id?: number) => {
      let url = `api/v1/groups`;
      if (id) {
        url += `/${id}`;
      }

      return await api()
        .withToken(auth.getToken() as string, 'bearer')
        .get(url);
    },
    patchGroupPerm: async (permissions: UpdateGroupPerm) => {
      return await api()
        .withToken(auth.getToken() as string, 'bearer')
        .patch(`api/v1/groups/${permissions.id}`, {
          permissions: permissions.permissions,
        });
    },
    getPermissions: async () => {
      return await api()
        .withToken(auth.getToken() as string, 'bearer')
        .get('api/v1/groups/permissions');
    },
  },
  user: {
    getUser: async (id?: number) => {
      let url = `api/v1/users`;
      if (id) {
        url += `/${id}`;
      }

      return await api()
        .withToken(auth.getToken() as string, 'bearer')
        .get(url);
    },
    resetPassword: async (id: number) => {
      const url = `api/v1/users/${id}/password`;
      return await api()
        .withToken(auth.getToken() as string, 'bearer')
        .patch(url);
    },
    createUser: async (user: User) => {
      const url = `api/v1/users`;
      return await api()
        .withToken(auth.getToken() as string)
        .post(url, toSnake(user));
    },
    updateUser: async (user: User) => {
      const url = `api/v1/users`;
      return await api()
        .withToken(auth.getToken() as string)
        .patch(url, toSnake(user));
    },
    updatePassword: async (id: number, password: string) => {
      const url = `api/v1/users/me/password`;
      return await api()
        .withToken(auth.getToken() as string)
        .patch(url, {
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

function* saveUser(action: PayloadAction<User>) {
  yield put(loaderModule.startLoading());
  try {
    let response: ApiResponse;
    let message: string;

    if (action.payload.id) {
      message = '사용자 등록';
      response = yield call(usersApi.user.updateUser, action.payload);
    } else {
      message = '사용자 수정';
      response = yield call(usersApi.user.createUser, action.payload);
    }

    const res: ApiResponse = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      yield put(usersModule.getGroup(action.payload.groupId));
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
  yield takeLatest(usersModule.getGroups, getGroupsSaga);
  yield takeLatest(usersModule.getGroup, getGroupSaga);
  yield takeLatest(usersModule.getEditGroup, getEditGroupSaga);
  yield takeLatest(usersModule.setGroupPermission, saveGroupPermSage);
  yield takeLatest(usersModule.getPermList, getPermListSaga);

  yield takeLatest(usersModule.getEditUser, getEditUserSaga);
  yield takeLatest(usersModule.resetPassword, resetPassword);
  yield takeLatest(usersModule.saveUser, saveUser);
}

export default function* usersSage() {
  yield fork(watchUsersSaga);
}
