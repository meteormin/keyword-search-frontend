import { configureStore } from '@reduxjs/toolkit';
import logger from 'store/middleware/logger';
import saga from 'store/middleware/saga';
import { rootReducer, rootSaga } from 'store/features';
import authCheck from 'store/middleware/authCheck';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, authCheck, saga]),
});

saga.run(rootSaga);
