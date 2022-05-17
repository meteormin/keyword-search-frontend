import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import saga from './middleware/saga';
import { rootReducer, rootSaga } from './features';
import httpClient from './middleware/httpClient';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, saga, httpClient]),
});

saga.run(rootSaga);
