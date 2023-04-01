import { PayloadAction } from '@reduxjs/toolkit';
import { auth } from 'helpers';
import { isErrorResponse } from 'api';

export interface AlertModalState {
    title: string;
    message: any;
    show?: boolean;
    refresh?: boolean;
}

export const initialState = {
    title: '',
    message: '',
    show: false,
    refresh: false,
};

export default {
    showAlert: (
        state: AlertModalState,
        action: PayloadAction<AlertModalState>,
    ) => {
        state.title = action.payload.title;
        state.message = action.payload.message;
        state.show = true;
        state.refresh = action.payload.refresh || false;
    },
    closeAlert: (state: AlertModalState) => {
        state.show = false;
    },
    errorAlert: (
        state: AlertModalState,
        action: PayloadAction<{
            res: any;
            refresh?: boolean;
            fallback?: {
                title: string;
                message: string;
            };
        }>,
    ) => {
        const { res, refresh, fallback } = action.payload;
        state.show = true;
        state.refresh = refresh || false;
        if (isErrorResponse(res)) {
            state.title = res.status;
            state.message = res.message;
            if (res.code == 401) {
                auth.logout();
                window.location.href = '/login';
            }
        } else {
            console.error('Unknown Error:', res);
            if (fallback) {
                state.title = fallback.title;
                state.message = fallback.message;
            } else {
                state.title = '알 수 없는 에러';
                state.message = '관리자에게 문의해주세요.';
            }
        }
    },
};
