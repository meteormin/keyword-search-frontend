import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { ForbiddenPage, NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { FindPassPage } from '../pages/password';
import { UsersPage } from '../pages/users';
import { AssignListPage as AssignTask } from '../pages/tasks';
import { SentenceListPage } from '../pages/sentences';
import Home from '../utils/Home';
import {
  AssignListPage as AssignReview,
  ReviewListPage,
} from '../pages/reviews';
import { UserType } from '../config/UserType';
import CreateForm from '../components/tasks/CreateForm';
import { handlePerm, handleGoHome } from './handler';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/test"
          element={
            <CreateForm
              workType={'rework'}
              show={true}
              time={'03:00:00'}
              onCreate={() => console.log('hi')}
            />
          }
        />
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
              <guard.Restricted
                condition={handlePerm([UserType.ADMIN])}
                redirectPath={'/error/403'}
              >
                <UsersPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/tasks">
          <Route
            index
            element={
              <guard.Restricted
                condition={handlePerm([UserType.WORKER, UserType.ADMIN])}
                redirectPath={'/error/403'}
              >
                <AssignTask />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/sentences">
          <Route
            index
            element={
              <guard.Restricted
                condition={handlePerm([UserType.WORKER, UserType.ADMIN])}
                redirectPath={'/error/403'}
              >
                <SentenceListPage />
              </guard.Restricted>
            }
          />
        </Route>
        <Route path="/reviews">
          <Route path="1">
            <Route
              index
              element={
                <guard.Restricted
                  condition={handlePerm([UserType.REVIEWER1, UserType.ADMIN])}
                  redirectPath={'/error/403'}
                >
                  <ReviewListPage seq={1} />
                </guard.Restricted>
              }
            />
            <Route
              path="assign"
              element={
                <guard.Restricted
                  condition={handlePerm([UserType.REVIEWER1, UserType.ADMIN])}
                  redirectPath={'/error/403'}
                >
                  <AssignReview seq={1} />
                </guard.Restricted>
              }
            />
          </Route>
          <Route path="2">
            <Route
              index
              element={
                <guard.Restricted
                  condition={handlePerm([UserType.REVIEWER2, UserType.ADMIN])}
                  redirectPath={'/error/403'}
                >
                  <ReviewListPage seq={2} />
                </guard.Restricted>
              }
            />
            <Route
              path="assign"
              element={
                <guard.Restricted
                  condition={handlePerm([UserType.REVIEWER2, UserType.ADMIN])}
                  redirectPath={'/error/403'}
                >
                  <AssignReview seq={2} />
                </guard.Restricted>
              }
            />
          </Route>
        </Route>
        <Route path="error">
          <Route path="403" element={<ForbiddenPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
