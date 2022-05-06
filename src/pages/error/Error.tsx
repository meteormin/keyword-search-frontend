import React from 'react';
import { useNavigate } from 'react-router';

export interface ErrorProps {
  code: string | number;
  name: string;
  message: string;
}

const Error = ({ code, name, message }: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center mt-4">
            <h1 className="display-1">{code}</h1>
            <p className="lead">{name}</p>
            <p>{message}</p>
            <a href="src/pages/error/Error#" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left me-1"></i>
              뒤로가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
