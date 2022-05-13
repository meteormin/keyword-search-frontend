import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { FindPassPage } from '../pages/password';
import { TestMain } from '../pages/test';
import { UsersPage } from '../pages/users';
import { TokenInfo } from '../utils/auth';
import { CreatePage, CreatedListPage } from '../pages/sentence';

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <guard.Protected auth={auth.isLogin()} redirectPath={'/login'}>
              <TestMain />
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
        <Route path="/sentence">
          <Route
            index
            element={
              <guard.Restricted condition={handlePerm(1)}>
                <CreatePage />
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
