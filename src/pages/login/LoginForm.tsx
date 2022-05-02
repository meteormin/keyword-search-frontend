import React from 'react';
import Loading from '../../components/Loading';
import AlertModal from '../../components/AlertModal';

export interface LoginFormProps {
  children: React.ReactNode | React.ReactNode[];
}

const LoginForm = ({ children }: LoginFormProps) => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <div className="row justify-content-center">
            <div className="col-lg-5">{children}</div>
          </div>
        </div>
        <Loading />
        <AlertModal />
      </main>
    </div>
  );
};

export default LoginForm;
