import { fork, takeLatest } from 'redux-saga/effects';
import hostStore, {
    useCallHostApi,
    usePutHostAction,
} from 'store/features/hosts';
import {
    CreateHost,
    GetList,
    GetListParam,
    GetSearch,
    GetSearchDescriptions,
    GetSearchParam,
    GetSubjects,
    PatchHost,
} from 'api/clients/Hosts';
import { ApiResponse, ErrorResInterface } from 'api/base/ApiClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { Host } from 'api/interfaces/Hosts';
import { Page } from 'api/interfaces/Common';
import {
    putEndLoading,
    putErrorAlert,
    putShowAlert,
    putStartLoading,
} from 'store/features';

const apiCall = useCallHostApi();
const putAction = usePutHostAction();

function* getList(action: PayloadAction<{ page: Page }>) {
    yield putStartLoading();
    try {
        const res: ApiResponse<GetList | ErrorResInterface> =
            yield apiCall.getList(action.payload.page as GetListParam);
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(res.data, 'Hosts', 'Host 목록 조회 실패');
            return;
        }
        const list = res.data as GetList;
        yield putAction.setList(list);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(err, 'Hosts', 'Host 목록 조회 실패');
    }
}

function* getSearch(
    action: PayloadAction<{ hostId: number; query: GetSearchParam }>,
) {
    yield putStartLoading();
    try {
        const res: ApiResponse<GetSearch | ErrorResInterface> =
            yield apiCall.getSearch(
                action.payload.hostId,
                action.payload.query,
            );
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(
                res.data,
                'Hosts',
                `Host ${action.payload.hostId} Search 목록 조회 실패`,
            );
            return;
        }

        const list = res.data as GetSearch;

        yield putAction.setSearch(list);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(
            err,
            'Hosts',
            `Host ${action.payload.hostId} Search 목록 조회 실패`,
        );
    }
}

function* getSubjects(action: PayloadAction<{ page: Page }>) {
    yield putStartLoading();
    try {
        const res: ApiResponse<GetSubjects | ErrorResInterface> =
            yield apiCall.getSubjects(action.payload.page);

        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(res.data, 'Hosts', 'Hosts Subjects 조회 실패');
            return;
        }

        const list = res.data as GetSubjects;

        yield putAction.setSubjects(list);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(err, 'Hosts', 'Hosts Subjects 조회 실패');
    }
}

function* getSearchDescriptions(
    action: PayloadAction<{ hostId: number; query: GetSearchParam }>,
) {
    yield putStartLoading();
    try {
        const res: ApiResponse<GetSearchDescriptions | ErrorResInterface> =
            yield apiCall.getSearchDescriptions(
                action.payload.hostId,
                action.payload.query,
            );
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(
                res.data,
                'Hosts',
                `Host ${action.payload.hostId} Search Description 목록 조회 실패`,
            );
            return;
        }

        const list = res.data as GetSearchDescriptions;

        yield putAction.setSearchDescriptions(list);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(
            err,
            'Hosts',
            `Host ${action.payload.hostId} Search Description 목록 조회 실패`,
        );
    }
}

function* find(action: PayloadAction<number>) {
    yield putStartLoading();
    try {
        const res: ApiResponse<Host | ErrorResInterface> = yield apiCall.find(
            action.payload,
        );
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(res.data, 'Hosts', 'Host 조회 실패');
            return;
        }
        const host = res.data as Host;
        yield putAction.setSelect(host);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(err, 'Hosts', 'Host 조회 실패');
    }
}

function* create(action: PayloadAction<CreateHost>) {
    yield putStartLoading();
    try {
        const res: ApiResponse<Host | ErrorResInterface> = yield apiCall.create(
            action.payload,
        );
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(res.data, 'Hosts', 'Host 생성 실패');
            return;
        }
        const host: Host = res.data as Host;
        yield putAction.setSelect(host);
        yield putShowAlert('Hosts', 'Host 생성 성공', true);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(err, 'Hosts', 'Host 생성 실패');
    }
}

function* patch(action: PayloadAction<{ id: number; host: PatchHost }>) {
    yield putStartLoading();
    try {
        const res: ApiResponse<Host | ErrorResInterface> = yield apiCall.patch(
            action.payload.id,
            action.payload.host,
        );
        yield putEndLoading();
        if (!res.isSuccess) {
            yield putErrorAlert(res.data, 'Hosts', 'Host 수정 실패');
            return;
        }
        const host: Host = res.data as Host;
        yield putAction.setSelect(host);
        yield putShowAlert('Hosts', 'Host 수정 성공', true);
    } catch (err) {
        yield putEndLoading();
        yield putErrorAlert(err, 'Hosts', 'Host 수정 실패');
    }
}

function* watchSaga() {
    yield takeLatest(hostStore.actions.getList, getList);
    yield takeLatest(hostStore.actions.getSearch, getSearch);
    yield takeLatest(hostStore.actions.getSubjects, getSubjects);
    yield takeLatest(
        hostStore.actions.getSearchDescriptions,
        getSearchDescriptions,
    );
    yield takeLatest(hostStore.actions.find, find);
    yield takeLatest(hostStore.actions.create, create);
    yield takeLatest(hostStore.actions.patch, patch);
}

export default function* Saga() {
    yield fork(watchSaga);
}
