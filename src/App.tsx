import './App.css';
import React from 'react';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css';
import { config } from './helpers';
import Header from './components/layouts/Header';
import { auth } from './helpers';
import Container from './components/layouts/Container';

function App() {
  return (
    <div className="sb-nav-fixed">
      <Header
        appName={config.app.name}
        isLogin={auth.isLogin()}
        dropDownMenu={config.layouts.header.dropDownMenu}
      />
      <Container
        header={'Header'}
        subject={'Subject'}
        menu={config.layouts.menu}
        footer={config.layouts.footer}
      >
        <Router />
      </Container>
    </div>
  );
}

export default App;
