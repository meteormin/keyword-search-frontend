import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountButtons from './CountButtons';
import { ApiClient } from '../../utils/ApiClient';
import { incrementAsync, selectCount } from '../../services/features/counter';
import Container from '../../components/layouts/Container';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementAsync(30));
  }, []);

  const client = new ApiClient('http://localhost');

  console.log(client.host);

  return (
    <Container header={'Counter'} subject={'Counter'}>
      <div>count: {count}</div>
      <CountButtons />
    </Container>
  );
};

export default Counter;
