import { configureStore } from '@reduxjs/toolkit';
import logger from 'store/middleware/logger';
import saga from 'store/middleware/saga';
import { rootReducer, rootSaga } from 'store/features';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, saga]),
});

saga.run(rootSaga);
