import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const _increment = (state: CounterState) => {
  state.value += 1;
};

const _decrement = (state: CounterState) => {
  state.value -= 1;
};

const _incrementByAmount = (
  state: CounterState,
  action: { payload: number },
) => {
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

export const selectCount = (state: any): number => state.counter.value;

export default counterSlice.reducer;
