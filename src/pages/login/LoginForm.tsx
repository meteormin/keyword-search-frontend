import React, { Fragment } from 'react';
import Loading from '../../components/common/Loading';
import AlertModal from '../../components/modal/AlertModal';

export interface LoginFormProps {
  children: React.ReactNode | React.ReactNode[];
}

const LoginForm = ({ children }: LoginFormProps) => {
  return (
    <Fragment>
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-lg-5">{children}</div>
        </div>
      </div>
      <Loading />
      <AlertModal />
    </Fragment>
  );
};

export default LoginForm;
