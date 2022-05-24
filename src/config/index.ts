import layouts from './layouts';
import permissions from './permissions';
import selectOptions from './selectOptions';

export default () => ({
  app: {
    name: process.env.REACT_APP_NAME || 'React',
    locale: process.env.REACT_APP_LOCALE || 'ko',
  },
  api: {
    host: process.env.REACT_APP_API_SERVER,
  },
  baikalNlp: {
    host: process.env.REACT_APP_BAIKAL_NLP,
  },
  auth: {
    tokenKey: '_token',
    refreshKey: '_refresh',
    userKey: '_user',
    userTypes: [
      {
        name: '최고 관리자',
        value: 'admin',
      },
      {
        name: '관리자',
        value: 'manager',
      },
      {
        name: '크라우드 워커',
        value: 'crowd_worker',
      },
    ],
    permissions: permissions,
  },
  layouts: layouts,
  selectOptions: selectOptions,
});
