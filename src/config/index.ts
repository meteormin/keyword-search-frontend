import layouts from './layouts';
import permissions from './permissions';
import selectOptions from './selectOptions';
import { UserType } from './UserType';

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
  },
  auth: {
    tokenKey: '_token',
    refreshKey: '_refresh',
    userKey: '_user',
    jobExpiredAt: '_jobTime',
    userTypes: [
      {
        name: 'ADMIN',
        value: UserType.ADMIN,
      },
    ],
    permissions: permissions,
  },
  layouts: layouts,
  selectOptions: selectOptions,
});
