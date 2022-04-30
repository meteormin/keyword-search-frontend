import { createLogger } from 'redux-logger';

export default createLogger({
  level: process.env.LOG_LEVEL || 'log',
});
