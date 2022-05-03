import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, guard } from '../helpers';
import { alertModalModule } from '../store/features/common/alertModal/alertModalReducer';
import Content from '../components/layouts/Content';
import NotFoundPage from '../pages/Error/NotFoundPage';
import LoginPage from '../pages/login/LoginPage';
import FindPassPage from '../pages/password/FindPassPage';

const Router = () => {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <guard.Protected auth={auth.isLogin()} redirectPath={'/login'}>
              <Content header={'Header'} subject={'Subject'} />
            </guard.Protected>
          }
        />
        <Route path="/test">
          <Route
            index
            element={
              <guard.Restricted
                condition={auth.isLogin() && true}
                redirectPath="/"
              >
                <Content header={'Header'} subject={'Subject'}>
                  <div
                    onClick={() =>
                      dispatch(
                        alertModalModule.showAlert({
                          title: 'test',
                          message: 'msg',
                        }),
                      )
                    }
                  >
                    hello, please login
                  </div>
                </Content>
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/login">
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/password">
          <Route path="find" element={<FindPassPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
