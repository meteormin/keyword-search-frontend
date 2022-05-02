import { createSlice } from '@reduxjs/toolkit';
// import { all, put, call, takeEvery, takeLatest } from 'redux-saga/effects';

const _increment = (state) => {
  state.value += 1;
};

const _decrement = (state) => {
  state.value -= 1;
};

const _incrementByAmount = (state, action) => {
  state.value += action.payload;
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: _increment,
    decrement: _decrement,
    incrementByAmount: _incrementByAmount,
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = (amount) => async (dispatch) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000),
  );

  dispatch(incrementByAmount(amount));
};

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
