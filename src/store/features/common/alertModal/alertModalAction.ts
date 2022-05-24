import { PayloadAction } from '@reduxjs/toolkit';

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
    if (state.refresh) {
      window.location.reload();
    }
  },
};
