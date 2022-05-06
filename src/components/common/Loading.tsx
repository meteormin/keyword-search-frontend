import React, { Fragment, useEffect } from 'react';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { loaderModule } from '../../store/features/common/loader/loaderReducer';

const Loading = () => {
  const { isLoading } = useSelector(loaderModule.getLoaderState);

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
