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
import { handleGoHome, handlePerm } from './handler';
import QuestionForm from '../components/questions/QuestionForm';
import { QuestionDiv } from '../utils/nia15/interfaces/questions';
import { QuestionsPage } from '../pages/questions';
import {
  CreatorStatList,
  DataStatList,
  ReviewStatsList,
} from '../pages/statistics';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/test"
          element={
            <QuestionForm
              isReply={false}
              method={'create'}
              div={QuestionDiv.CREATE}
              show={true}
              onHide={() => null}
              onSubmit={() => null}
            />
          }
        />
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
          <Route path="find" element={<FindPassPage />} />
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
        <Route path="/tasks">
          <Route
            index
            element={
              <guard.Restricted
                condition={handlePerm([UserType.WORKER, UserType.ADMIN])}
                redirect={<ForbiddenPage />}
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
                redirect={<ForbiddenPage />}
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
                  redirect={<ForbiddenPage />}
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
                  redirect={<ForbiddenPage />}
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
                  redirect={<ForbiddenPage />}
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
                  redirect={<ForbiddenPage />}
                >
                  <AssignReview seq={2} />
                </guard.Restricted>
              }
            />
          </Route>
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
        <Route path={'/statistics'}>
          <Route index element={<DataStatList />} />
          <Route path={'task'} element={<DataStatList />} />
          <Route path={'creator'} element={<CreatorStatList />} />
          <Route path={'review'}>
            <Route path={'1'} element={<ReviewStatsList seq={1} />} />
            <Route path={'2'} element={<ReviewStatsList seq={2} />} />
          </Route>
        </Route>

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
