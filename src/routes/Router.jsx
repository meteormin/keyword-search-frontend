import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
// import TestRoute from './TestRoute';
import NotFoundPage from '../pages/Error/NotFoundPage';
import { auth, config, guard } from '../helpers';
import Content from '../components/layouts/Content';
import { showAlert } from '../services/features/alertModal';
import CounterPage from '../pages/counter/CounterPage';
import { useDispatch } from 'react-redux';

const Router = () => {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test">
          <Route
            index
            element={
              <guard.Restricted
                condition={auth.isLogin() && true}
                redirectPath="/"
              >
                <Content
                  header={'Header'}
                  subject={'Subject'}
                  footer={config.layouts.footer}
                >
                  <div
                    onClick={() =>
                      dispatch(showAlert({ title: 'test', message: 'msg' }))
                    }
                  >
                    hello, please login
                  </div>
                </Content>
              </guard.Restricted>
            }
          />
          <Route
            path="counter"
            element={
              <guard.Protected auth={true} redirectPath={'/'}>
                <CounterPage />
              </guard.Protected>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
