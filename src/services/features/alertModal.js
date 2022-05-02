import { createSlice } from '@reduxjs/toolkit';

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: {
    title: '',
    message: '',
    show: false,
  },
  reducers: {
    showAlert: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.show = true;
    },
    closeAlert: (state) => {
      state.show = false;
    },
  },
});

export const { showAlert, closeAlert } = alertModalSlice.actions;

export default alertModalSlice.reducer;
