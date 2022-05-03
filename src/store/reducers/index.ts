// import reducers
import { combineReducers } from 'redux';
import counterReducer from './counter';
import loaderReducer from './loader';
import loginReducer from './auth/login';
import alertModalReducer from './modal/alertModal';

export default combineReducers({
  // reducers
  counter: counterReducer,
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
});
