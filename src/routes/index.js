import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Protected from './Protected';
import React from 'react';
import Restricted from './Restricted';
import Counter from '../pages/counter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test">
          <Route
            index
            element={
              <Protected auth={false} redirectPath="/">
                <div>hi</div>
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
