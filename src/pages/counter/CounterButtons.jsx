import {
  decrement,
  increment,
  incrementByAmount,
} from '../../services/features/counter';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CounterButtons = () => {
  const count = useSelector((state) => {
    return state.counter.value;
  });

  const dispatch = useDispatch();

  return (
    <Fragment>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(count))}>x2</button>
    </Fragment>
  );
};

export default CounterButtons;
