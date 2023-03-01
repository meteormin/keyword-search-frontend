// import reducers
import { Action, combineReducers } from 'redux';
import { all, call, put, SimpleEffect } from 'redux-saga/effects';
import loaderReducer from 'store/features/common/loader/loaderReducer';
import loginReducer from 'store/features/auth/loginReducer';
import alertModalReducer from 'store/features/common/alertModal/alertModalReducer';
import loginSaga from 'store/features/auth/loginSaga';
import hostsReducer from 'store/features/hosts/reducer';
import hostSaga from 'store/features/hosts/saga';
import searchReducer from 'store/features/search/reducer';
import searchSaga from 'store/features/search/saga';
import { isErrorResponse, serializeErrorResponse } from '../../api';
import alertModalStore from 'store/features/common/alertModal';
import loaderStore from 'store/features/common/loader';

export interface ActionCall {
  (action: Action): Action | SimpleEffect<any>;
}

export const rootReducer = combineReducers({
  // reducers
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
  hosts: hostsReducer,
  search: searchReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([call(loginSaga), call(hostSaga), call(searchSaga)]);
};

export const putStartLoading = () => {
  return put(loaderStore.startLoading());
};

export const putEndLoading = () => {
  return put(loaderStore.endLoading());
};

export const putShowAlert = (
  title: string,
  message: string,
  refresh?: boolean,
) => {
  return put(alertModalStore.showAlert({ title, message, refresh }));
};

export const putErrorAlert = (res: any, title: string, message: string) => {
  if (isErrorResponse(res)) {
    return put(
      alertModalStore.errorAlert({
        res: serializeErrorResponse(res),
        fallback: {
          title: title,
          message: message,
        },
      }),
    );
  }

  return put(
    alertModalStore.errorAlert({
      res: res,
      fallback: {
        title: title,
        message: message,
      },
    }),
  );
};
