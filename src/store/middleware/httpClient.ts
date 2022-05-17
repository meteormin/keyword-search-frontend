import { api, auth } from '../../helpers';

const httpClient = (store: any) => (next: any) => (action: any) => {
  if (auth.getToken()) {
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
      });
  }

  next(action);
};

export default httpClient;
