import { PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '../../../../utils/ApiClient';

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
    if (res instanceof ErrorResponse) {
      state.title = res.error;
      state.message = res.message;
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
