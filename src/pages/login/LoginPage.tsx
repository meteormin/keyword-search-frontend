import React from 'react';
import { useAuthDispatch, useAuthState } from 'store/features/auth';
import LoginForm from 'components/login/LoginForm';
import { useAlertModalDispatch } from 'store/features/common/alertModal';

const LoginPage = () => {
    const { id, password } = useAuthState();
    const authDispatcher = useAuthDispatch();
    const alertModalDispatcher = useAlertModalDispatch();
    const onSubmit = () => {
        if (id && password) {
            authDispatcher.login(id, password);
        } else {
            alertModalDispatcher.showAlert(
                '로그인',
                '아이디 또는 비밀번호를 입력해주세요.',
            );
        }
    };

    const onChangeId = (e: { target: HTMLInputElement }) =>
        authDispatcher.changeId(e.target.value);

    const onChangePass = (e: { target: HTMLInputElement }) =>
        authDispatcher.changePass(e.target.value);

    return (
        <LoginForm>
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                        Login
                    </h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-floating mb-3">
                            <input
                                className="form-control"
                                id="inputEmail"
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                onChange={onChangeId}
                            />
                            <label htmlFor="inputEmail">아이디</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={onChangePass}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        if (id && password) {
                                            onSubmit();
                                        }
                                    }
                                }}
                            />
                            <label htmlFor="inputPassword">비밀번호</label>
                        </div>
                        <div className="form-check mb-3"></div>
                        <div className="row mt-4 mb-0">
                            {/*<a*/}
                            {/*  className="small"*/}
                            {/*  href="/password/find"*/}
                            {/*  onClick={() => navigate('/password/find')}*/}
                            {/*>*/}
                            {/*  비밀번호 찾기*/}
                            {/*</a>*/}
                            <a
                                className="btn btn-primary float-end"
                                href="#"
                                onClick={onSubmit}
                            >
                                로그인
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
