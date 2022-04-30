import React from 'react';
import { useSelector } from 'react-redux';
import CountButtons from './CountButtons';

const Counter = () => {
  const count = useSelector((state) => {
    return state.counter.value;
  });

  console.log(count);

  return (
    <div>
      <div>count: {count}</div>
      <CountButtons />
    </div>
  );
};

export default Counter;
