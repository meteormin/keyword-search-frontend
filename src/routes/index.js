import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Protected from './Protected';
import React from 'react';
import Restricted from './Restricted';
import Counter from '../pages/counter';
import Container from '../components/layouts/Container';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test">
          <Route
            index
            element={
              <Protected auth={false} redirectPath="/">
                <Container header={'Header'} subject={'Subject'}>
                  hi
                </Container>
              </Protected>
            }
          />
          <Route
            path="counter"
            element={
              <Restricted condition={false}>
                <Counter />
              </Restricted>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
