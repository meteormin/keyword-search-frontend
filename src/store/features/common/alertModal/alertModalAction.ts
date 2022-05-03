import { PayloadAction } from '@reduxjs/toolkit';

export interface AlertModalState {
  title: string;
  message: string;
  show: boolean;
}

export const initialState = {
  title: '',
  message: '',
  show: false,
};

export default {
  showAlert: (state: AlertModalState, action: PayloadAction<any>) => {
    state.title = action.payload.title;
    state.message = action.payload.message;
    state.show = true;
  },
  closeAlert: (state: AlertModalState) => {
    state.show = false;
  },
};
