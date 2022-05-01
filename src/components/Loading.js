import React, { Fragment } from 'react';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../services/features/loader';

const Loading = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="spinner text-center">
      {isLoading ? <Spinner /> : <Fragment></Fragment>}
    </div>
  );
};

export default Loading;
