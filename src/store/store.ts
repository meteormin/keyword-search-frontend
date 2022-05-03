import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import saga from './middleware/saga';
import rootReducers from './reducers';
import rootSaga from './sagas';

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, saga]),
});

saga.run(rootSaga);
