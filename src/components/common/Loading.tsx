import React from 'react';
import Spinner from 'components/common/Spinner';
import { useSelector } from 'react-redux';
import loaderModule from 'store/features/common/loader';

const Loading = () => {
  const { isLoading } = useSelector(loaderModule.getLoaderState);

  return (
    <div
      className="spinner text-center"
      style={isLoading ? { zIndex: 1 } : { zIndex: -1 }}
    >
      {isLoading ? <Spinner /> : null}
    </div>
  );
};

export default Loading;
