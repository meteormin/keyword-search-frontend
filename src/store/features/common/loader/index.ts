import {
  startLoading,
  endLoading,
  getLoaderState,
} from 'store/features/common/loader/loaderReducer';
import { LoaderState } from 'store/features/common/loader/loaderAction';
import { useDispatch, useSelector } from 'react-redux';

export const useLoaderState = (): LoaderState => {
  return useSelector(getLoaderState);
};

export const useLoaderDispatch = () => {
  const dispatch = useDispatch();

  return {
    startLoading: dispatch(startLoading()),
    endLoading: dispatch(endLoading()),
  };
};

export default {
  startLoading,
  endLoading,
  getLoaderState,
};
