import './App.css';
import React from 'react';
import Router from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css';
import Navigator from './components/layouts/Navigator';
import config from './config';
import Container from './components/layouts/Container';
import Header from './components/layouts/Header';
import { isLogin } from './utils/auth';

function App() {
  const conf = config();

  return (
    <div className="sb-nav-fixed">
      <Header
        appName={conf.app.name}
        isLogin={isLogin()}
        dropDownMenu={conf.layouts.header.dropDownMenu}
      />
      <div id="layoutSidenav">
        <Navigator menu={conf.layouts.menu} />
        <Router />
      </div>
    </div>
  );
}

export default App;
