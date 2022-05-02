import { createSlice } from '@reduxjs/toolkit';

export interface AlertModalState {
  title: string;
  message: string;
  show: boolean;
}

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: {
    title: '',
    message: '',
    show: false,
  },
  reducers: {
    showAlert: (state: AlertModalState, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.show = true;
    },
    closeAlert: (state: AlertModalState) => {
      state.show = false;
    },
  },
});

export const { showAlert, closeAlert } = alertModalSlice.actions;
export const selectAlertState = (state: any): AlertModalState =>
  state.alertModal;

export default alertModalSlice.reducer;
