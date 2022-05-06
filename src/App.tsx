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
import { Menu } from './components/layouts/Navigator';

function App() {
  return (
    <div className="sb-nav">
      <Header
        appName={config.app.name}
        isLogin={auth.isLogin()}
        dropDownMenu={config.layouts.header.dropDownMenu}
        userName={auth.user()?.name || ''}
      />
      <Container
        menu={config.layouts.menu as Menu}
        isLogin={auth.isLogin()}
        footer={config.layouts.footer}
      >
        <Router />
      </Container>
    </div>
  );
}

export default App;
