import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { FindPassPage } from '../pages/password';
import { TestMain } from '../pages/test';

const Router = () => {
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
