import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import loaderModule from '../common/loader';
import alertModalModule from '../common/alertModal';
import usersModule from './';
import { apiResponse, auth } from '../../../helpers';
import { ApiResponse } from '../../../utils/ApiClient';
import { toCamel } from 'snake-camel';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  Group,
  PatchGroup,
  PostGroup,
} from '../../../utils/nia153/interfaces/group';
import {
  User,
  PostUser,
  PatchUser,
} from '../../../utils/nia153/interfaces/user';
import newClient, { Clients } from '../../../utils/nia153/api';
import { UsersState } from './userAction';
import { SearchState } from '../../../pages/users/UsersPage';

const usersApi = newClient(Clients.Users);
const groupsApi = newClient(Clients.Groups);

function* getGroupsSaga() {
  yield put(loaderModule.startLoading());
  try {
    const response: ApiResponse = yield call(groupsApi.getGroups);

    const res = apiResponse(response);
    if (response.isSuccess) {
      const groups: Group[] = res.data.map(toCamel);

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
      groupsApi.getGroup,
      action.payload,
    );

    const res = apiResponse(response);

    if (response.isSuccess) {
      const group: Group = toCamel(res) as Group;
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
      groupsApi.getGroup,
      action.payload,
    );

    const res = apiResponse(response);

    if (response.isSuccess) {
      const group: Group = toCamel(res) as Group;
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
    const response: ApiResponse = yield call(usersApi.getUser, action.payload);

    const res = apiResponse(response);
    if (response.isSuccess) {
      const user: User = toCamel(res) as User;
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

function* saveGroupPermSage(action: PayloadAction<PatchGroup>) {
  yield put(loaderModule.startLoading());

  try {
    const response: ApiResponse = yield call(
      groupsApi.updateGroup,
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
      usersApi.resetPassword,
      userId,
      null,
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

function* saveGroup(action: PayloadAction<Group | PostGroup | PatchGroup>) {
  yield put(loaderModule.startLoading());
  try {
    let response: ApiResponse;
    let message: string;

    if ('id' in action.payload && action.payload.id) {
      message = '그룹 수정';
      response = yield call(
        groupsApi.updateGroup,
        action.payload as PatchGroup,
      );
    } else {
      message = '그룹 등록';
      response = yield call(groupsApi.createGroup, action.payload as PostGroup);
    }

    yield put(loaderModule.endLoading());

    if (response.isSuccess) {
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

function* saveUser(action: PayloadAction<PatchUser | PostUser>) {
  yield put(loaderModule.startLoading());
  try {
    let response: ApiResponse;
    let message: string;
    const { currentGroup }: UsersState = yield select(
      usersModule.getUsersState,
    );
    if ('id' in action.payload && action.payload.id) {
      const patchUser = action.payload as PatchUser;
      message = '사용자 수정';
      response = yield call(
        usersApi.updateUser,
        patchUser.id as number,
        patchUser,
      );
    } else {
      message = '사용자 등록';
      response = yield call(usersApi.createUser, action.payload as PostUser);
    }

    const res: ApiResponse = apiResponse(response);
    yield put(loaderModule.endLoading());
    if (response.isSuccess) {
      yield put(
        alertModalModule.showAlert({
          title: message + ' 성공',
          message: message + ' 성공',
        }),
      );
      yield put(usersModule.actions.getGroup(currentGroup.id));
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
        usersApi.resetPassword,
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
  } catch (e) {
    yield put(
      alertModalModule.showAlert({
        title: '로그인 에러',
        message: '로그인 정보가 없습니다.',
      }),
    );
  }
}

function* searchUser(action: PayloadAction<SearchState>) {
  yield put(loaderModule.startLoading());
  const searchState = action.payload;

  try {
    if (searchState.groupId) {
      const response: ApiResponse = yield call(
        usersApi.searchUsers,
        searchState,
      );

      const res = apiResponse(response);
      yield put(loaderModule.endLoading());
      if (!response.isSuccess) {
        yield put(
          alertModalModule.errorAlert({
            res: res,
            refresh: true,
          }),
        );
      } else {
        yield put(
          usersModule.actions.setUsers(res.data.map(toCamel) as User[]),
        );
      }
    } else {
      yield put(loaderModule.endLoading());
      yield put(
        alertModalModule.showAlert({
          title: '그룹 미선택',
          message: '먼저 그룹을 선택해주세요.',
        }),
      );
    }
  } catch (e) {
    yield put(loaderModule.endLoading());
    yield put(
      alertModalModule.showAlert({
        title: '사용자 검색 실패',
        message: e,
      }),
    );
  }
}

function* watchUsersSaga() {
  yield takeLatest(usersModule.actions.getGroups, getGroupsSaga);
  yield takeLatest(usersModule.actions.getGroup, getGroupSaga);
  yield takeLatest(usersModule.actions.getEditGroup, getEditGroupSaga);
  yield takeLatest(usersModule.actions.searchUser, searchUser);
  yield takeLatest(usersModule.actions.getEditUser, getEditUserSaga);
  yield takeLatest(usersModule.actions.resetPassword, resetPassword);
  yield takeLatest(usersModule.actions.saveUser, saveUser);
  yield takeLatest(usersModule.actions.saveGroup, saveGroup);
}

export default function* usersSage() {
  yield fork(watchUsersSaga);
}
