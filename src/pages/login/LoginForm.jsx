import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({ children }) => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

LoginForm.propTypes = {
  children: propTypes.element,
};

export default LoginForm;
