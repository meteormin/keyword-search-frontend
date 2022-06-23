import React, { useState } from 'react';
import LoginForm from '../../components/login/LoginForm';
import { useDispatch } from 'react-redux';
import usersModule from '../../store/features/users';

const ResetPassPage = () => {
  const dispatch = useDispatch();
  const [myPassword, setMyPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  return (
    <LoginForm>
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header">
          <h3 className="text-center font-weight-light my-4">비밀번호 변경</h3>
        </div>
        <div className="card-body">
          <div className="small mb-3 text-muted">
            비밀번호를 잘못 변경하신 경우 관리자를 통해 초기화할 수 있습니다.
          </div>
          <form>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="myPassword"
                type="password"
                placeholder="password"
                value={myPassword}
                onChange={(e) => setMyPassword(e.target.value)}
              />
              <label htmlFor="inputEmail">현재 비밀번호</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="newPassword"
                type="password"
                placeholder="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="inputEmail">변경 비밀번호</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="newPasswordConfirmation"
                type="password"
                placeholder="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
              />
              <label htmlFor="inputEmail">변경 비밀번호 확인</label>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
              <a className="small" href="/login">
                로그인
              </a>
              <a
                className="btn btn-primary"
                onClick={() => {
                  dispatch(usersModule.actions.updatePassword(newPassword));
                }}
              >
                비밀번호 설정
              </a>
            </div>
          </form>
        </div>
        <div className="card-footer text-center py-3">
          {/*<div className="small">*/}
          {/*  <a href="register.html">Need an account? Sign up!</a>*/}
          {/*</div>*/}
        </div>
      </div>
    </LoginForm>
  );
};

export default ResetPassPage;
