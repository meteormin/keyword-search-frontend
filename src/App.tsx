import './App.css';
import React, { useEffect } from 'react';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css';
import { config } from './helpers';
import Header from './components/layouts/Header';
import { auth } from './helpers';
import Container from './components/layouts/Container';
import { Menu } from './components/layouts/Navigator';
import { UserType } from './config/UserType';
import { handleMenuVisible } from './routes/handler';

function App() {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerHTML = config.app.name || 'title';
    }
  });

  const menu = config.layouts.menu as Menu;
  let userType = auth.user()?.userType;

  switch (userType) {
    case UserType.ADMIN:
      userType = '최고 관리자';
      break;
    case UserType.REVIEWER1:
      userType = '1차 검수자';
      break;
    case UserType.WORKER:
      userType = '생성자';
      break;
    case UserType.REVIEWER2:
      userType = '2차 검수자';
      break;
    default:
      auth.logout();
      break;
  }

  menu.header = userType as string;

  return (
    <div className="sb-nav">
      <Header
        appName={config.app.name as string}
        isLogin={auth.isLogin()}
        dropDownMenu={config.layouts.header.dropDownMenu}
        userName={auth.user()?.loginId || ''}
      />
      <Container
        menu={handleMenuVisible(config.layouts.menu as Menu)}
        isLogin={auth.isLogin()}
        footer={config.layouts.footer}
      >
        <Router />
      </Container>
    </div>
  );
}

export default App;
