// import features
import { combineReducers } from 'redux';
import counterReducer from './counter';
import loaderReducer from './loader';
import loginReducer from './login';
import alertModalReducer from './alertModal';

export default combineReducers({
  // features
  counter: counterReducer,
  loader: loaderReducer,
  login: loginReducer,
  alertModal: alertModalReducer,
});
