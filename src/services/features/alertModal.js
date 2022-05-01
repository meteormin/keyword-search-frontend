import { createSlice } from '@reduxjs/toolkit';

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: {
    title: '',
    message: '',
    show: false,
  },
  reducers: {
    show: (state, action) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
  },
});

export const { show, close } = alertModalSlice.actions;

export default alertModalSlice.reducer;
