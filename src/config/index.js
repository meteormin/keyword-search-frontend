import menu from './menu';

export default () => ({
  app: {
    name: 'Test',
  },
  api: {},
  auth: {
    tokenKey: '_token',
    userKey: 'user',
  },
  menu: menu,
  header: {
    dropDownMenu: [
      {
        name: 'Settings',
        url: '#',
      },
      {
        name: 'myInfo',
        url: '#',
      },
    ],
  },
});
