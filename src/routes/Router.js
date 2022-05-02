import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Protected from './Protected';
import React from 'react';
import Restricted from './Restricted';
import Container from '../components/layouts/Container';
import CounterContainer from '../pages/counter/CounterContainter';
import { auth, config } from '../helpers';
import { useDispatch } from 'react-redux';
import { showAlert } from '../services/features/alertModal';

const Router = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test">
          <Route
            index
            element={
              <Restricted condition={auth.isLogin() && true} redirectPath="/">
                <Container
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
                </Container>
              </Restricted>
            }
          />
          <Route
            path="counter"
            element={
              <Protected auth={true} redirectPath={'/'}>
                <CounterContainer />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
