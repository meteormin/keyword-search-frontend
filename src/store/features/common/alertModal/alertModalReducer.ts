import { createSlice } from '@reduxjs/toolkit';
import alertModalAction, {
  initialState,
  AlertModalState,
} from './alertModalAction';

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: initialState,
  reducers: alertModalAction,
});

const { showAlert, closeAlert } = alertModalSlice.actions;

export const alertModalModule = {
  showAlert,
  closeAlert,
  selectAlertState: (state: any): AlertModalState => state.alertModal,
};

export default alertModalSlice.reducer;
