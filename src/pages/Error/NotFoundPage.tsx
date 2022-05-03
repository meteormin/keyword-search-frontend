import Error from './Error';
import React from 'react';

const NotFoundPage = () => {
  return (
    <Error
      code={404}
      name={'not found page'}
      message={'존재하지 않는 페이지'}
    />
  );
};

export default NotFoundPage;
