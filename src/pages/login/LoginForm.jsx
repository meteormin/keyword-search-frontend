import React from 'react';
import propTypes from 'prop-types';
import Loading from '../../components/Loading';
import AlertModal from '../../components/AlertModal';

const LoginForm = ({ children }) => {
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

LoginForm.propTypes = {
  children: propTypes.element,
};

export default LoginForm;
