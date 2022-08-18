import layouts from './layouts';
import permissions from './permissions';
import selectOptions from './selectOptions';

export default () => ({
  app: {
    name: process.env.REACT_APP_NAME || 'React',
    locale: process.env.REACT_APP_LOCALE || 'ko',
  },
  api: {
    default: {
      host: process.env.REACT_APP_API_SERVER,
      clientId: process.env.REACT_APP_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    },
    baikalNlp: {
      host: process.env.REACT_APP_BAIKAL_NLP_HOST,
    },
    tmkor: {
      host: process.env.REACT_APP_TMKOR_HOST,
      token: process.env.REACT_APP_TMKOR_TOKEN,
    },
  },
  auth: {
    tokenKey: '_token',
    refreshKey: '_refresh',
    userKey: '_user',
    jobExpiredAt: '_jobTime',
    userTypes: [
      {
        name: '최고 관리자',
        value: 'ADMIN',
      },
      {
        name: '평가자',
        value: 'SCORE',
      },
      {
        name: '검수자',
        value: 'REVIEWER',
      },
    ],
    permissions: permissions,
  },
  layouts: layouts,
  selectOptions: selectOptions,
});
