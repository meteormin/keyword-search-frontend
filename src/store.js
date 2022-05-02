import { configureStore } from '@reduxjs/toolkit';
import logger from './services/middleware/logger';
import saga from './services/middleware/saga';
import rootReducers, { rootSaga } from './services/features';

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, saga]),
});

saga.run(rootSaga);
