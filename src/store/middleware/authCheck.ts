import { api, auth, date } from '../../helpers';

const authCheck = (store: any) => (next: any) => (action: any) => {
  if (auth.getToken()) {
    const tokenInfo = auth.tokenInfo((auth.getToken() as string) || '');
    let isValid = false;

    if (tokenInfo) {
      const expAt = date.unix(tokenInfo.exp);
      const now = date(new Date());
      const expTime = date.duration(expAt.diff(now));

      if (expTime.asSeconds() > 0) {
        isValid = true;
      }
    }

    if (!isValid) {
      api()
        .withToken(auth.getToken() as string, 'bearer')
        .get('api/v1/users/me')
        .then((res) => {
          if (res.isSuccess) {
            console.log('access_token is alive');
            return;
          }

          if (res.res.status == 401) {
            // refresh
            console.log('need refresh');
          }

          auth.logout();
          window.location.href = '/';
        })
        .catch((res) => {
          console.log('need refresh');
          auth.logout();
          window.location.href = '/';
        });
    }
  }

  next(action);
};

export default authCheck;
