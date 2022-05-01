import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountButtons from './CountButtons';
import { ApiClient } from '../../utils/ApiClient';
import { incrementAsync, selectCount } from '../../services/features/counter';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementAsync(30));
  }, []);

  const client = new ApiClient('http://localhost');

  console.log(client.host);

  return (
    <div>
      <div>count: {count}</div>
      <CountButtons />
    </div>
  );
};

export default Counter;
