import { call, fork, put, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import usersModule from './';
import { apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  Group,
  UpdateGroupPerm,
  User,
  CreateGroup,
  CreateUser,
} from '../../../utils/nia15/interfaces/users';
import newClient, { Clients } from '../../../utils/nia15/api';

const usersApi = newClient(Clients.Users);

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
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '데이터 조회 실패',
          message: '데이터를 불러오는데 실패했습니다.',
        }),
      );
    }
  } catch (error) {
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
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (error) {
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
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (error) {
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
        alertModalModule.errorAlert({
          res: res,
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

// function* getPermListSaga() {
//   yield put(loaderModule.startLoading());
//
//   try {
//     const response: ApiResponse = yield call(usersApi.group.getPermissions);
//     const res = apiResponse(response);
//     if (response.isSuccess) {
//       const permList: Permission[] = res.data.permissions.map(toCamel);
//       yield put(loaderModule.endLoading());
//       yield put(usersModule.actions.setPermList(permList));
//     } else {
//       if ('name' in res && 'message' in res) {
//         yield put(
//           alertModalModule.showAlert({
//             title: res.name,
//             message: res.message,
//           }),
//         );
//       } else {
//         yield put(
//           alertModalModule.showAlert({
//             title: '데이터 조회 실패',
//             message: '데이터를 불러오는데 실패했습니다.',
//           }),
//         );
//       }
//     }
//   } catch (error) {
//     yield put(
//       alertModalModule.showAlert({
//         title: '데이터 조회 실패',
//         message: '데이터를 불러오는데 실패했습니다.',
//       }),
//     );
//   }
// }

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
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.errorAlert({
          res: res,
        }),
      );
    }
  } catch (error) {
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
        alertModalModule.errorAlert({
          res: res,
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

function* updatePassword(action: PayloadAction<string>) {
  yield put(loaderModule.startLoading());
  try {
    if (auth.user()?.id) {
      const response: ApiResponse = yield call(
        usersApi.user.updatePassword,
        auth.user()?.id as number,
        action.payload,
      );

      const res = apiResponse(response);
      if (response.isSuccess) {
        yield put(
          alertModalModule.showAlert({
            title: '비밀번호 변경',
            message: '비밀번호 변경 완료',
          }),
        );
      } else {
        yield put(
          alertModalModule.errorAlert({
            res: res,
            refresh: true,
          }),
        );
      }
    } else {
      yield put(
        alertModalModule.showAlert({
          title: '로그인 에러',
          message: '로그인 정보가 없습니다.',
        }),
      );
    }
  } catch (e) {}
}

function* watchUsersSaga() {
  yield takeLatest(usersModule.actions.getGroups, getGroupsSaga);
  yield takeLatest(usersModule.actions.getGroup, getGroupSaga);
  yield takeLatest(usersModule.actions.getEditGroup, getEditGroupSaga);
  yield takeLatest(usersModule.actions.setGroupPermission, saveGroupPermSage);
  // yield takeLatest(usersModule.actions.getPermList, getPermListSaga);

  yield takeLatest(usersModule.actions.getEditUser, getEditUserSaga);
  yield takeLatest(usersModule.actions.resetPassword, resetPassword);
  yield takeLatest(usersModule.actions.saveUser, saveUser);
  yield takeLatest(usersModule.actions.saveGroup, saveGroup);
}

export default function* usersSage() {
  yield fork(watchUsersSaga);
}
