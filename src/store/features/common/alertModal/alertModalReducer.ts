import { createSlice } from '@reduxjs/toolkit';
import alertModalAction, {
  initialState,
  AlertModalState,
} from 'store/features/common/alertModal/alertModalAction';

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: initialState,
  reducers: alertModalAction,
});

export const { showAlert, closeAlert, errorAlert } = alertModalSlice.actions;
export const getAlertState = (state: any): AlertModalState => state.alertModal;

export default alertModalSlice.reducer;
