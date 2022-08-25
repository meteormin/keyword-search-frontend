import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { ForbiddenPage, NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { ResetPassPage } from '../pages/password';
import { UsersPage } from '../pages/users';
import Home from '../utils/Home';
import { UserType } from '../config/UserType';
import { handleGoHome, handlePerm } from './handler';
import QuestionForm from '../components/questions/QuestionForm';
import { QuestionsPage } from '../pages/questions';
import { ScoreAssignListPage, ScoreListPage } from '../pages/scores';

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
        <Route path="/users">
          <Route
            index
            element={
              <guard.Restricted
                condition={handlePerm([UserType.ADMIN])}
                redirect={<ForbiddenPage />}
              >
                <UsersPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/scores">
          <Route
            path="assigns"
            element={
              <guard.Restricted
                condition={handlePerm([UserType.SCORE, UserType.ADMIN])}
                redirect={<ForbiddenPage />}
              >
                <ScoreAssignListPage />
              </guard.Restricted>
            }
          />
          <Route
            index
            element={
              <guard.Restricted
                condition={handlePerm([UserType.SCORE, UserType.ADMIN])}
                redirect={<ForbiddenPage />}
              >
                <ScoreListPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path={'/questions'}>
          <Route
            index
            element={
              <QuestionsPage userType={auth.user()?.userType as UserType} />
            }
          />
        </Route>

        {/**통계**/}

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
