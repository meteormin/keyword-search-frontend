import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from 'helpers';
import { ForbiddenPage, NotFoundPage } from 'pages/error';
import { LoginPage, LogoutPage } from 'pages/login';
import { ResetPassPage } from 'pages/password';

import Home from 'utils/Home';

import { handleGoHome, handlePerm } from 'routes/handler';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <guard.Protected auth={auth.isLogin()} redirect={'/login'}>
              <Home role={auth.user()?.userType || ''} rules={handleGoHome()} />
            </guard.Protected>
          }
        />
        <Route path="/login">
          <Route
            index
            element={
              <guard.Restricted condition={auth.isLogin()} redirect={'/'}>
                <LoginPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/password">
          <Route
            path="reset"
            element={
              <guard.Protected auth={auth.isLogin()} redirect={'/login'}>
                <ResetPassPage />
              </guard.Protected>
            }
          />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="errors">
          <Route path="403" element={<ForbiddenPage />} />
          <Route path="404" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
