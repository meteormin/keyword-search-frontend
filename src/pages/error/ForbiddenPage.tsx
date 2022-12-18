import React from 'react';
import Error from 'pages/error/Error';

const ForbiddenPage = () => {
  return (
    <Error code={403} name={'Forbidden'} message={'접근 권한이 없습니다.'} />
  );
};

export default ForbiddenPage;
