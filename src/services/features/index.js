// import features
import { combineReducers } from 'redux';
import counterReducer from './counter';

export default combineReducers({
  // features
  counter: counterReducer,
});
