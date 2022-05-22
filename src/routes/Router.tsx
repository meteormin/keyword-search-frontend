import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { auth, guard } from '../helpers';
import { ForbiddenPage, NotFoundPage } from '../pages/error';
import { LoginPage, LogoutPage } from '../pages/login';
import { FindPassPage } from '../pages/password';
import { UsersPage } from '../pages/users';
import { TokenInfo } from '../utils/auth';
import { AssignListPage as AssignTask } from '../pages/tasks';
import { SentenceListPage } from '../pages/sentences';
import Home from '../utils/Home';
import {
  AssignListPage as AssignReview,
  ReviewListPage,
} from '../pages/reviews';

const Router = () => {
  const handlePerm = (menuNumber: string) => {
    const token = auth.getToken();
    if (token) {
      const tokenInfo: TokenInfo | null = auth.tokenInfo(token);
      if (tokenInfo) {
        const permissions = tokenInfo.permission;

        return !permissions.includes(menuNumber);
      }
    }

    return true;
  };

  const handleGoHome = () => {
    return [
      { role: 'admin', home: '/users' },
      { role: 'manager', home: '/reviews' },
      { role: 'cloud_worker', home: '/tasks' },
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
              <guard.Restricted
                condition={handlePerm('MANAGE_GROUP')}
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
                condition={handlePerm('CREATE_SENTENCE')}
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
                condition={handlePerm('CREATE_SENTENCE')}
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
                  condition={handlePerm('REVIEW_SENTENCE')}
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
                  condition={handlePerm('REVIEW_SENTENCE')}
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
                  condition={handlePerm('REVIEW_SENTENCE_2')}
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
                  condition={handlePerm('REVIEW_SENTENCE_2')}
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
