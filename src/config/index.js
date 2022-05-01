import layouts from './layouts';

export default () => ({
  app: {
    name: 'Test',
  },
  api: {},
  auth: {
    tokenKey: '_token',
    userKey: 'user',
  },
  layouts: layouts,
});
