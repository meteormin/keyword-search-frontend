import layouts from './layouts';

export default () => ({
  app: {
    name: 'Test',
  },
  api: {
    host: process.env.REACT_APP_API_SERVER,
  },
  auth: {
    tokenKey: '_token',
    userKey: 'user',
  },
  layouts: layouts,
});
