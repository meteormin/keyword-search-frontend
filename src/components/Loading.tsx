import React, { Fragment } from 'react';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../store/reducers/loader';

const Loading = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div
      className="spinner text-center"
      style={isLoading ? { zIndex: 1 } : { zIndex: -1 }}
    >
      {isLoading ? <Spinner /> : <Fragment></Fragment>}
    </div>
  );
};

export default Loading;
