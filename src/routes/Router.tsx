import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { FindPassPage } from '../pages/password';
import { UsersPage } from '../pages/users';
import { TokenInfo } from '../utils/auth';
import { AssignListPage, CreatedListPage } from '../pages/task';
import Home from '../utils/Home';
import CreateForm from '../components/task/CreateForm';

const Router = () => {
  const handlePerm = (menuNumber: number) => {
    const token = auth.getToken();
    if (token) {
      const tokenInfo: TokenInfo = auth.tokenInfo(token);
      const permissions = tokenInfo.permission;

      return !permissions.includes(menuNumber);
    }

    return true;
  };

  const handleGoHome = () => {
    return [
      { role: 'admin', home: '/users' },
      { role: 'manager', home: '/task' },
      { role: 'crowd_worker', home: '/task' },
    ];
  };

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route*/}
        {/*  path="/test"*/}
        {/*  element={*/}
        {/*    <guard.Protected*/}
        {/*      auth={auth.isLogin()}*/}
        {/*      redirectPath={'/login'}*/}
        {/*    ></guard.Protected>*/}
        {/*  }*/}
        {/*/>*/}
        <Route
          path="/"
          element={
            <guard.Protected auth={auth.isLogin()} redirectPath={'/login'}>
              <Home role={auth.user()?.userType || ''} rules={handleGoHome()} />
            </guard.Protected>
          }
        />
        <Route path="/login">
          <Route
            index
            element={
              <guard.Restricted condition={auth.isLogin()} redirectPath={'/'}>
                <LoginPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/password">
          <Route path="find" element={<FindPassPage />} />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/users">
          <Route
            index
            element={
              <guard.Restricted condition={handlePerm(7)} redirectPath={'/'}>
                <UsersPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/task">
          <Route
            index
            element={
              <guard.Restricted condition={handlePerm(1)}>
                <AssignListPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
