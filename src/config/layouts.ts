import { menu152, menu153 } from './menu';

const layouts = {
  menu: {
    '152': menu152,
    '153': menu153,
  },
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
    company: 'aiworks',
    privacyUrl: '#',
    termsUrl: '#',
  },
};

export default layouts;
