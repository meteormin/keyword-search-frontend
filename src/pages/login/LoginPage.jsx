import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginState,
  loginSubmit,
  setLoginId,
  setLoginPass,
} from '../../services/features/login';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const { id, password } = useSelector(selectLoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => dispatch(loginSubmit({ id, password }));

  const onChangeId = (e) => dispatch(setLoginId(e.target.value));

  const onChangePass = (e) => dispatch(setLoginPass(e.target.value));

  return (
    <LoginForm>
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header">
          <h3 className="text-center font-weight-light my-4">Login</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="inputEmail"
                type="text"
                placeholder="name@example.com"
                onChange={onChangeId}
              />
              <label htmlFor="inputEmail">아이디</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="inputPassword"
                type="password"
                placeholder="Password"
                onChange={onChangePass}
              />
              <label htmlFor="inputPassword">비밀번호</label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                id="inputRememberPassword"
                type="checkbox"
                value=""
              />
              <label
                className="form-check-label"
                htmlFor="inputRememberPassword"
              >
                Remember Password
              </label>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
              <a
                className="small"
                href="/login/password"
                onClick={() => navigate('/login/password')}
              >
                비밀번호 찾기
              </a>
              <a className="btn btn-primary" href="#" onClick={onSubmit}>
                Login
              </a>
            </div>
          </form>
        </div>
        {/*<div className="card-footer text-center py-3">*/}
        {/*  <div className="small">*/}
        {/*    <a href="register.html">Need an account? Sign up!</a>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </LoginForm>
  );
};

export default LoginPage;
