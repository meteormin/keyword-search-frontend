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
    userTypes: [
      {
        name: '최고 관리자',
        value: 'Admin',
      },
      {
        name: '1차 검수자',
        value: 'SentenceReview1',
      },
      {
        name: '2차 검수자',
        value: 'SentenceReview2',
      },
      {
        name: '평가자',
        value: 'SentenceScore',
      },
      {
        name: '평가 검수자',
        value: 'SentenceScoreReview',
      },
      {
        name: '크라우드 워커',
        value: 'Creator',
      },
    ],
    permissions: permissions,
  },
  layouts: layouts,
  selectOptions: selectOptions,
});
