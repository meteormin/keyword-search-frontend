import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import saga from './middleware/saga';
import { rootReducer, rootSaga } from './features';
import authCheck from './middleware/authCheck';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, authCheck, saga]),
});

saga.run(rootSaga);
