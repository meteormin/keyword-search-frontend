import { api, auth, date } from 'helpers';

const authCheck = (store: any) => (next: any) => (action: any) => {
  if (auth.getToken()?.accessToken) {
    let isValid = false;
    console.debug('hi');
    const tokenInfo = auth.tokenInfo(
      auth.getToken()?.accessToken.token as string,
    );

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
        .withToken(auth.getToken()?.accessToken.token as string, 'bearer')
        .get('api/users/me')
        .then((res) => {
          if (res.isSuccess) {
            console.log('access_token is alive');
            return;
          }

          if (res.res && res.res.status == 401) {
            // refresh
            console.log('need refresh');
          }

          auth.logout();
          window.location.href = '/login';
        })
        .catch((reason) => {
          console.log('need refresh', reason);
          auth.logout();
          window.location.href = '/login';
        });
    }
  }

  next(action);
};

export default authCheck;
