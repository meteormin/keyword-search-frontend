import layouts from 'config/layouts';
import permissions from 'config/permissions';
import selectOptions from 'config/selectOptions';
import { UserRole } from 'config/UserType';

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
                value: UserRole.ADMIN,
            },
        ],
        permissions: permissions,
    },
    layouts: layouts,
    selectOptions: selectOptions,
});
