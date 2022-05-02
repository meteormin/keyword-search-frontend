import createSagaMiddleware from 'redux-saga';

const monitor = window['__SAGA_MONITOR_EXTENSION__'];
export default createSagaMiddleware({ sagaMonitor: monitor });
