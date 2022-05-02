import React from 'react';
import { useNavigate } from 'react-router';
import propTypes from 'prop-types';

const Error = ({ code, name, message }) => {
  const navigate = useNavigate();
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mt-4">
                <h1 className="display-1">{code}</h1>
                <p className="lead">{name}</p>
                <p>{message}</p>
                <a href="#" onClick={() => navigate(-1)}>
                  <i className="fas fa-arrow-left me-1"></i>
                  뒤로가기
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Error.propTypes = {
  code: propTypes.number,
  name: propTypes.string,
  message: propTypes.string,
};

export default Error;
