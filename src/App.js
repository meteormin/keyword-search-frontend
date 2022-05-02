import './App.css';
import React from 'react';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css';
import Navigator from './components/layouts/Navigator';
import { config } from './helpers';
import Header from './components/layouts/Header';
import { auth } from './helpers';

// import Loading from './pages/Loading';

function App() {
  return (
    <div className="sb-nav-fixed">
      <Header
        appName={config.app.name}
        isLogin={auth.isLogin()}
        dropDownMenu={config.layouts.header.dropDownMenu}
      />
      <div id="layoutSidenav">
        <Navigator menu={config.layouts.menu} />
        <Router />
      </div>
    </div>
  );
}

export default App;
