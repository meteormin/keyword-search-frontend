import { menu } from './menu';

const layouts = {
  menu: menu,
  header: {
    dropDownMenu: [
      {
        name: 'Settings',
        url: '#',
      },
      {
        name: 'reset password',
        url: '/password/reset',
      },
    ],
  },
  footer: {
    company: 'testworks',
    privacyUrl: '#',
    termsUrl: '#',
  },
};

export default layouts;
